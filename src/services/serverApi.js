const url = "https://www.pokedexneaime.store/"

const withAuthHeaders = (method = "GET", body = null) => ({
  method,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
  ...(body ? { body: JSON.stringify(body) } : {}),
})

const serverApi = {
  registerUser: async (data) => {
    try {
      const a = await fetch(`${url}auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const b = await a.json()
      if (a.status !== 200) {
        return { message: b.message ?? "Register failed", status: false }
      }

      return { message: "Signed-up in successfully!", status: true, data: b }
    } catch (error) {
      console.error(error)
      return { message: "Network error", status: false }
    }
  },
  loginUser: async (data) => {
    try {
      const a = await fetch(`${url}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      const b = await a.json()
      if (a.status !== 200) {
        return { message: b.message ?? "Login failed", status: false }
      }

      return { message: "Logged in successfully!", status: true, data: b }
    } catch (error) {
      return { message: "Network error", status: false }
    }
  },
  getCapturedPokemons: async () => {
    try {
      const a = await fetch(`${url}pokemon/captured`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
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
      const a = await fetch(
        `${url}pokemon/capture`,
        withAuthHeaders("POST", {
          pokemonName: pokemonName,
          userId: sessionStorage.getItem("id"),
        })
      )
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
      const a = await fetch(`${url}pokemon/captured-by/${userId}`, withAuthHeaders("GET"))
      const b = await a.json()
      return b;
    } catch (error) {
      console.error(error)
      return false
    }
  },
  updateAccount: async (data) => {
    try {
      const a = await fetch(
        `${url}user/update`,
        withAuthHeaders("PATCH", {
          id: sessionStorage.getItem("id"),
          name: data.name,
          username: data.username,
          password: data.password,
        })
      )
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
  getThemePreferences: async () => {
    try {
      const a = await fetch(`${url}user/preferences/theme`, withAuthHeaders("GET"))
      if (a.status !== 200) {
        return false
      }

      const b = await a.json()
      return { status: true, data: b }
    } catch (error) {
      return false
    }
  },
  saveThemePreferences: async (preferences) => {
    try {
      const a = await fetch(
        `${url}user/preferences/theme`,
        withAuthHeaders("PATCH", preferences)
      )

      if (a.status !== 200) {
        return false
      }

      return true
    } catch (error) {
      return false
    }
  },
  deleteAccount: async (password) => {
    try {
      const a = await fetch(
        `${url}user/delete`,
        withAuthHeaders("DELETE", {
          id: sessionStorage.getItem("id"),
          password: password,
        })
      )
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

// Removed duplicate/invalid code block
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