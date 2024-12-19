import User from "../models/user.model"


export const seedDB = async () => {
    try {
        let data = await User.find({role: 'admin'})
        if (data.length === 0) {
            await User.create({
                name: 'Jisr',
                email: 'admin@gmail.com',
                role: 'admin',
                password: '123456',
            })
            console.log('Admin created successfully.')
        }
    } catch (e) {
        console.log(e)
    }
}