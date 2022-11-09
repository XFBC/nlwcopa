import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()


async function main(){
const user = await prisma.user.create({
  data:{
    name:'John Doe',
    email: 'jogndoe@gmail.com',
    avataUrl: 'https://github.com/fabricio.png',
    
  }
})



  const pool = await prisma.pool.create({
    data:{
      title: 'Bolão Exemplo',
      code: 'BOL123',
      ownerId: user.id,

      participants:{
        create:{
          userId: user.id
        }
      }
    }

    
  })
  

  


  
  await prisma.game.create({
    data: {
      date:'2022-11-01T23:15:12.742Z',
      firstTeamCountryCode:'AR',
      secondTeamCountryCode: 'BR',

      guesses:{
        create:{
          firstTeamPoints: 2,
          secondTeamPoints:1,

          participant:{
            connect:{
              userId_poolId:{
                userId: user.id,
                poolId: pool.id,
              }
            }
          }
          
        }
      }
    },

    
    
  })




}

main()