export class error_handler extends Error{
    
  constructor(message,status,data){
        super(message)
        this.message=message,
        this.status=status,
        this.data=data
  }

}