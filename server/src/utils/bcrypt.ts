import * as bcrypt from 'bcrypt';

export const encryptText = async (text: string): Promise<string> => {
    const saltOrRounds = 10;
    return await bcrypt.hash(text, saltOrRounds);
};

export const getIsMatchEncryptText = async (text: string, hashText: string): Promise<boolean> => {
    return await bcrypt.compare(text, hashText);
};
