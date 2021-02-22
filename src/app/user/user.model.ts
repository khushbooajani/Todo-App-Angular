export class User {
    subscribe(arg0: (currentUser: User) => void): import("rxjs").Subscription {
      throw new Error('Method not implemented.');
    }
    constructor(
        public email: string,
        public firstName: string,
        public lastName: string,
        public password: string,
        public gender: string,
        public address: string,
        public profileImage: string | ArrayBuffer,
        public todoList: any[],
    ){}
}

export class TodoList{
    constructor(
        public taskName: string,
        public category: string,
        public isPublic: string,
        public status: string,
        public date: string,
        public isReminder: string,
        public reminderDate: string,
       // public todoImage: string | ArrayBuffer
    ){}
}