export interface UserModel {
    _id: string;
    username: string;
    password: string;
    email: string;
    phone: string;
    profilePic: string;
    profession: string[];
    institution: string[];
    area: string[];    
    status: string;
    isExpert: string;
    createdBy: any;
    updatedBy: any;
    createdAt: string;
    updatedAt: string;
}
