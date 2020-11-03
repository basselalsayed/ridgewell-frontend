import crypto from 'crypto';

const [algorithm, hex, iv, key, utf8] = [
  'aes-256-cbc',
  'hex',
  process.env.REACT_APP_MY_IV,
  process.env.REACT_APP_MY_SECRET_KEY,
  'utf-8',
];

const decrypt = encrypted => {
  let decipher = crypto.createDecipheriv(algorithm, key, iv);

  let decrypted = decipher.update(encrypted, hex, utf8);
  decrypted += decipher.final(utf8);

  return decrypted;
};

const decryptUser = user => ({
  ...user,
  email: decrypt(user.email),
  username: decrypt(user.username),
});

export { decryptUser };
