const sql  = require('../sql').branches

module.exports = (rep, pgp) => {
  return {
    insert: (name, location, address, contact_info) =>
      rep.one(sql.insert_one, name, location, address, contact_info, branch => branch.id),

    select: () => 
      rep.any(sql.select_all)
  }
}
