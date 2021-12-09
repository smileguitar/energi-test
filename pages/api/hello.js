// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { value } from '../../services/web3';

export default (req, res) => {
  res.status(200).json({ name: value })
}
