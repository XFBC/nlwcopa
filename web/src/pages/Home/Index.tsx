import appImage from '../../assets/app-nlw.png'
import logoImage from '../../assets/logo.svg'
import avatarsUsers from '../../assets/users-avatar.png'
import check from '../../assets/icon-check.svg'
import { FormEvent, useEffect, useState } from 'react'
import { api } from '../../service/axios'

export default function Home() {
  const [pools, setPools] = useState([])
  const [guesses, setGuesses] = useState([])
  const [users, setUsers] = useState([])

  async function getUsers() {
    const response = await api.get('/users/count')
    setUsers(response.data)
    console.log(response.data)
  }

  async function getPools() {
    const response = await api.get('/pools/count')
    setPools(response.data)
    console.log(response.data)
  }

  async function getGuesses() {
    const response = await api.get('guesses/count')
    setGuesses(response.data)
  }

  useEffect(() => {
    getPools()
    getGuesses()
    getUsers()
  }, [])

  // ----------------

  const [poolTitle, setPoolTitle] = useState('')

  console.log(poolTitle)

  async function createPoll(event: FormEvent) {
    event.preventDefault()

    try {
      const response = await api.post('pools', {
        title: poolTitle
      })

      const { code } = response.data

      await navigator.clipboard.writeText(code)

      alert(`Bolão criado com sucesso. Seu código é: ${code}`)

      setPoolTitle('')
    } catch (err) {
      alert('falha ao criar o bolão')
      console.log(err)
    }
  }

  return (
    <div className="max-w-[1120px] mx-auto grid grid-cols-2 items-center h-screen gap-28">
      <main>
        <img src={logoImage} alt="logo" />

        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          {' '}
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex row items-center gap-2">
          <img src={avatarsUsers} alt="usersAvatars" />

          <strong className="text-white font-bold text-xl">
            <span className=" text-greenCopa-500">+{users.count}</span> pessoas
            já estão usando
          </strong>
        </div>

        <div>
          <form onSubmit={createPoll} className="mt-10 flex flex-row gap-2">
            <input
              className="flex-1 rounded pl-6 bg-[#323238] text-greenCopa-500"
              type="text"
              placeholder="Qual nome do seu bolão ?"
              onChange={event => setPoolTitle(event.target.value)}
              required
              value={poolTitle}
            />

            <button
              type="submit"
              className="uppercase bg-yellowCopa-500 px-6 py-[21px] rounded font-bold text-sm"
            >
              {' '}
              Criar meu bolão
            </button>
          </form>

          <p className="mt-4 text-gray-500 ">
            {' '}
            Após criar seu bolão, você receberá um código único que poderá usar
            para convidar outras pessoas 🚀
          </p>
        </div>

        <div className="flex row mt-10 pt-10 border-t border-[#323238] gap-16 divide-x divide-[#323238] text-gray-100">
          <div className="flex row gap-6 items-center">
            <img src={check} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl"> + {pools.count}</span>
              <span>Bolões criados</span>
            </div>
          </div>
          <div className="flex row gap-6 items-center pl-16">
            <img src={check} />
            <div className="flex flex-col">
              <span className="font-bold text-2xl"> +{guesses.count}</span>
              <span>Palpites enviados</span>
            </div>
          </div>
        </div>
      </main>

      <div className="w-[500px]">
        <img src={appImage} alt="mobileMockup" />
      </div>
    </div>
  )
}
