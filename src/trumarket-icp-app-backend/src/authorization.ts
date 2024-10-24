import crypto from 'crypto';

const publicKey = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAv1043uAV3y4YTNAVC0FZ
bxhXSLSsBViD4GRCD8/xSDUlrSYpXbDfIfLk+S2EI3P0A0TKBEKq8HuxhtHh8xil
4a5CSJ7g5KqOiEW19QZKeA2ZH2Pcgj/kOaFQwHDXinHO7J4O7u2QrVMQUPNNIxj4
rM4Mn7hwe0/Dk8uVOFG6IM8TAl+RCRRczQ6DqWWrNlxHrIA4LKUPsgUcIRRlxgkj
v1N+FnRYppKRkcIEO0Uvgfeq7NVdhsqmS6X59QYF8VDzd0ES07HMqf08AbKbaZZ1
g8d6ARrvg74J4Xqegn96Y4d6qnDgPIE5nY9QyqjJKgtA3tra2uLCIefWxfHQWfzI
mQIDAQAB
-----END PUBLIC KEY-----`;

export const verifySignature = async (signature: string) => {
  const verify = crypto.createVerify('SHA256');
  verify.update('This is a secret message');
  verify.end();

  const isVerified = verify.verify(publicKey, signature, 'hex');
  return isVerified;
};

export const auth = async (signature: string) => {
  // const isVerified = await verifySignature(signature);
  const isVerified =
    signature ===
    '202a9e30f303a8ec8ed0a7d2143100728dae672e3cbcaf12eb7d484329f3e1b026751f93cded7b1a0540fb07d47b50e042f9ff443d9123d4a6a64156a585ef6782704240a9f5124c0682d231c7c12287b22cd96de9ca5f97e968ebb01f2505b8e6d0c617a8b30c65ab457f0ee4f2bed26aa4a0adbf4bf769a30b51291a274ae424f488a726528f9d45f38223db67dd12213ad0d34b96416edb22f676d099f9310b05f24540bb35c7b799d3fc03e3706fa6ed777d0e152c4bb97d5e8f6ca3fa6b37e4d959413e4de5a3330dbef508a44b5bd0371b0cf4114ebd83d0093937625062fcc14fe220a754eb4d6cb5d4063214068048b6c0177e958ad1dc76ca9ee54e';
  if (!isVerified) {
    throw new Error('Invalid signature');
  }

  return true;
};
