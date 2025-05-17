"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import React from 'react'

function Provider({children}) {

  const {user} = useUser();
  const [userDetail, setuserDetail] = useState()
  useEffect(() => {
    user&&createNewUser()
  }, [user])
  const createNewUser = async () => {
    //if user exist?

    let { data: Users, error } = await supabase
    .from('Users')
    .select('*')
    .eq('email', user?.priaryEmailAddress.emailAddress)
    console.log(Users)
    if(Users.length ==0){
        const { data, error } = await supabase
        .from('Users')
        .insert([
            { 
                name:user?.fullName,
                email:user?.priaryEmailAddress.emailAddress
            },
        ])
  .select()
  setuserDetail(data[0])
  return;
    }
    setuserDetail(Users[0])
  }
  return (
    <UserDetailContext.Provider value = {{userDetail, setuserDetail}}>
        <div className='w-full'>Provider</div>
    </UserDetailContext.Provider>
  )
}

export default Provider