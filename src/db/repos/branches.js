const sql  = require('../sql').branches

module.exports = (rep, pgp) => {
  return {
    // Adds a new branch and returns the new id:
    insert: values => {      
      let query = `insert into branches(name, address, contact_info)
       values ( '${values.name}', '${values.address}', '${values.contact_info}')
       returning branch_id`
      return rep.one(query, branch_id => branch_id)
    }
      ,

    // Returns all branch records:
    all: () => 
      rep.any(sql.select_all),

    update: values =>
      rep.one(sql.update, values, branch => branch.id),

    // Tries to find a branch by id:
    find: id =>
      rep.oneOrNone(sql.select_by_id, id),
    
    // Tries to remove a branch by ID, and returns the number of records deleted
    remove: id =>
      // rep.result(sql.delete_by_id, id, r => r.rowCount)
      rep.result(`DELETE FROM branches WHERE branch_id = ${id};`)
  }
}
