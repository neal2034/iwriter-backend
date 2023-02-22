import * as bcrypt from 'bcrypt';

/**
 * salt the password
 * @param password
 * @param rounds
 */
export async function saltPassword(password:string, rounds=10){
  const salt = await bcrypt.genSalt(rounds);
  if (password) {
    password = await bcrypt.hash(password, salt);
  }
  return password;
}

/**
 * check whether password is match
 * @param originalPwd the original password
 * @param saltedPwd the salted password
 */
export async function isPasswordMatch(originalPwd, saltedPwd){
  return bcrypt.compare(originalPwd, saltedPwd)
}