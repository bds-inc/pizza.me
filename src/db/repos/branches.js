const sql  = require('../sql').branches

module.exports = (rep, pgp) => {
  return {
    # Adds a new branch and returns the new id:
    insert: values =>
      rep.one(sql.insert_one, values, branch => branch.id),

    # Returns all branch records:
    all: () => 
      rep.any(sql.select_all),

    update: values =>
      rep.one(sql.update, values, branch => branch.id),

    # Tries to find a branch by id:
    find: id =>
      rep.oneOrNone(sql.select_by_id, id)
    
  }
}
