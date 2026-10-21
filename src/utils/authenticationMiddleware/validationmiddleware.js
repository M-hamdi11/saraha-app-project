export function authmiddleware(schema, source = "body") {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);

    if (!result.success) {
      return res.status(400).json({
        message: "validation error",
        errors: result.error.issues.map(i => ({
          field: i.path.join("."),
          message: i.message,
        })),
      });
    }

    if (source === "query") {
      
      Object.defineProperty(req, "query", {
        value: result.data,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    } else {
      req[source] = result.data;  
    }

    next();
  };
}
