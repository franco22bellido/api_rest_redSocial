import bcrypt from 'bcryptjs';

export const encryptPass = async (password)=>{
    const salt = await bcrypt.genSalt(10);
    const passwordEncript = await bcrypt.hash(password,salt);
    return passwordEncript;
}
export const comparePass = async (password, passwordEncript)=>{
    const compare =  await bcrypt.compare(password,passwordEncript);
    return compare;
}