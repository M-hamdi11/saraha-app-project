 export default class base_repo {
    model;
  constructor(model){
    this.model = model;
  }
   finddocument(filter){
    return this.model.findOne(filter) 
  }
  createdocument(body){
    return this.model.create(body)
  }
  updatedocument(filter,body){
    return this.model.updateOne(filter,body)
  }
  finddocbyid(id){
   return this.model.findById(id)
  }
  deletedocument(filter){
    return this.model.deleteOne(filter)
  }
  findalldocuments(){
    return this.model.find()

  }

}