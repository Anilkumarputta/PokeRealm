
const url = "https://www.pokedexneaime.store/"

const patchOptions = {
  auth: {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem("token")
    },
    body: null
  }
}

const postOptions = {
  auth: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + sessionStorage.getItem("token")
    },
    body: null
  },
  post: {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: null
  }
}

const getOptions = {
  auth: {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    }
  },
  get: {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }
  }
}

const deleteOptions = {
  auth: {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${sessionStorage.getItem("token")}`
    },
    body: null
  }
}

const serverApi = {
  registerUser: async (data) => {
    try {
      postOptions.post.body = JSON.stringify(data)
      const a = await fetch(`${url}auth/register`,
        postOptions.post
      )
      const b = await a.json()
      if (a.status !== 200) {
        return { message: b.message, status: false }
      }
      if (b.token) {
        sessionStorage.clear()
        sessionStorage.setItem("token", b.token)
        sessionStorage.setItem("user", b.username)
        sessionStorage.setItem("id", b.id)
        sessionStorage.setItem("name", b.name)
      }
      return { message: "Signed-up in successfully!", status: true, data: b }
    } catch (error) {
      console.error(error)
      return false
    }
  },
  loginUser: async (data) => {
    try {
      postOptions.post.body = JSON.stringify(data)
      const a = await fetch(`${url}auth/login`,
        postOptions.post
      )
      const b = await a.json()
      if (a.status !== 200) {
        return { message: b.message, status: false }
      }
      sessionStorage.clear()
      sessionStorage.setItem("token", b.token)
      sessionStorage.setItem("user", b.username)
      sessionStorage.setItem("id", b.id)
      sessionStorage.setItem("name", b.name)
      return { message: "Logged in successfully!", status: true, data: b }
    } catch (error) {
      return { message: error, status: false }
    }
  },
  getCapturedPokemons: async () => {
    try {
      const a = await fetch(`${url}pokemon/captured`,
        getOptions.get
      )
      const b = await a.json()

      if (a.status !== 200) {
        return { message: b.message, status: false }
      }

      return { message: "Pokemons fetched successfully!", status: true, data: b }
    } catch (error) {
      console.error(error)
      return false
    }
  },
  capturePokemon: async (pokemonName) => {
    try {
      postOptions.auth.body = JSON.stringify({ pokemonName: pokemonName, userId: sessionStorage.getItem("id") })
      const a = await fetch(`${url}pokemon/capture`, postOptions.auth)
      const b = await a.json()

      if (a.status === 200) {
        return { message: b.message, status: true }
      } else if (a.status === 401) {
        return { message: "Unauthorized", status: false }
      }

    } catch (error) {
      console.error(error)
      return false
    }
  },
  getCapturedPokemonsByUser: async (userId) => {
    try {
      const a = await fetch(`${url}pokemon/captured-by/${userId}`, getOptions.auth)
      const b = await a.json()
      return b;
    } catch (error) {
      console.error(error)
      return false
    }
  },
  updateAccount: async (data) => {
    try {
      patchOptions.auth.body = JSON.stringify({
        id: sessionStorage.getItem("id"),
        name: data.name,
        username: data.username,
        password: data.password
      })
      const a = await fetch(`${url}user/update`, patchOptions.auth)
      const b = await a.json()

      if (a.status === 200) {
        sessionStorage.setItem("user", b.username)
        sessionStorage.setItem("name", b.name)
        return { message: "Account updated successfully!", status: true }
      } else {
        return { message: b.message, status: false }
      }
    } catch (error) {
      console.error(error);
      return error
    }
  },
  deleteAccount: async (password) => {
    try {
      deleteOptions.auth.body = JSON.stringify({
        id: sessionStorage.getItem("id"),
        password: password
      })
      const a = await fetch(`${url}user/delete`, deleteOptions.auth)
      const b = await a.json()

      if (a.status !== 200) {
        return { message: b.message, status: false }
      }

      sessionStorage.clear()
      return { message: "Account deleted successfully!", status: true }

    } catch (error) {
      console.error(error)
      return false
    }
  }
}

export default serverApi;