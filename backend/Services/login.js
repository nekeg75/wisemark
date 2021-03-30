const { user_db } = require("../Database/users.json")

module.exports = (login) => {
  const emailInput = login.email
  const passInput = login.password
  
  let user = user_db.filter((search)=>
  {
    if(search.email === emailInput)
    {
      if(search.password === passInput)
      {
        return true
      }
    }
    return false
  })
  if(user.length === 0)
  {
    return [false,{"errorMessages": ["Check login details", "Contact a wisemark admin"]}]
  }

  return [true,user]
}
