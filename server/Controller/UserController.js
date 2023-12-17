import prisma from  "../DB/db.config.js";


export const createUser = async (req, res) => {
    const {firstName, lastName, address, email, phoneNumber, password } = req.body

    const findUser = await prisma.user.findUnique({
        where: {
            email: email
        }
    })

    if(findUser){
        return res.json({status:400, message:"Email already exist."})
    }
    else{
        const newUser = await prisma.user.create({
            data:{
                firstName:firstName,
                lastName:lastName,
                address:address,
                email:email,
                phoneNumber:phoneNumber,
                password:password
            }
        })

        return res.json({status:200, data:newUser, msg:"New user created"})
    }
}