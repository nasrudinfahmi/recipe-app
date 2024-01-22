import axios from "axios";
const BASE_URL = "http://localhost:3000";

async function refreshToken() {
  try {
    const response = await axios.get(`${BASE_URL}/token`);
    const token = response.data.datas;
    return token;
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.message;
      console.log(errorMessage);
    } else {
      console.log(error.message);
    }
  }
}

async function login(dataValues) {
  const { data } = await axios.post(`${BASE_URL}/user/login`, dataValues, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
}

async function register(dataValues) {
  const { data } = await axios.post(`${BASE_URL}/user/register`, dataValues);
  return data;
}

async function getRecipeById(axiosJWT, idRecipe) {
  try {
    let loading = true;
    const url = `${BASE_URL}/recipe/${idRecipe}`;
    const response = await axiosJWT.get(url);
    loading = false;
    return { recipe: response.data.datas, loading, status: 200 };
  } catch (error) {
    let status;
    if (error.response) status = error.response.status;
    return { recipe: null, loading: false, status };
  }
}

async function getRecipes() {
  try {
    let loading = true;
    const url = `${BASE_URL}/recipes`;
    const { data } = await axios.get(url);
    console.log(data);
    loading = false;
    return { recipes: data.datas.recipes, loading };
  } catch (error) {
    console.log(error.message);
    return { recipes: null, loading: false };
  }
}

async function getOwnRecipes(axiosJWT, idUser) {
  try {
    let loading = true;
    const url = `${BASE_URL}/recipe/own/${idUser}`;
    const { data } = await axiosJWT.get(url);
    loading = false;
    return { recipes: data, loading };
  } catch (error) {
    let status;
    if (error.response) status = error.response.status;
    return { recipes: [], loading: false, status };
  }
}

async function getRecipesByTitleOrMainIngre(axiosJwt, keyword, value) {
  try {
    let loading = true;
    const url = `${BASE_URL}/recipe?${keyword}=${value}`;
    const { data } = await axiosJwt.get(url);
    loading = false;
    return { recipes: data.datas.recipes, loading, status: 200 };
  } catch (error) {
    let status;
    if (error.response) status = error.response.status;
    return { recipes: null, loading: false, status };
  }
}

async function addRecipe(axiosJWT, dataRecipe) {
  try {
    let loading = true;
    const url = `${BASE_URL}/recipe/add`;
    const response = await axiosJWT.post(url, dataRecipe);
    loading = false;
    return { response, loading, status: 201 };
  } catch (error) {
    let status;
    if (error.response) {
      status = error.response.status;
      return { response: error.response, loading: false, status };
    } else {
      return { response: null, loading: false, status: 500 };
    }
  }
}

async function editRecipe(axiosJWT, idRecipe, dataRecipe) {
  try {
    let loading = true;
    const url = `${BASE_URL}/recipe/${idRecipe}`;
    const { data } = await axiosJWT.patch(url, dataRecipe);
    loading = false;
    return { response: data, status: 200, loading };
  } catch (error) {
    let status;
    if (error.response) {
      status = error.response.status;
      return { response: error.response, loading: false, status };
    } else {
      return { response: null, loading: false, status: 500 };
    }
  }
}

async function deleteRecipe(axiosJWT, idRecipe) {
  try {
    let loading;
    const url = `${BASE_URL}/recipe/${idRecipe}`;
    await axiosJWT.delete(url);
    loading = false;
    return { status: 200, loading };
  } catch (error) {
    let status;
    if (error.response) status = error.response.status;
    console.log(error.message);
    return { status, loading: false };
  }
}

async function logout(axiosJWT) {
  try {
    await axiosJWT.delete(`${BASE_URL}/user/logout`);
  } catch (error) {
    console.log(error);
  }
}

async function deleteAccount(axiosJWT, data) {
  try {
    await axiosJWT.delete(`${BASE_URL}/user/delete`, {
      method: "DELETE",
      data: data,
    });
  } catch (error) {
    console.log(error);
  }
}

export {
  refreshToken,
  login,
  register,
  getRecipeById,
  addRecipe,
  editRecipe,
  deleteRecipe,
  getRecipes,
  getOwnRecipes,
  getRecipesByTitleOrMainIngre,
  logout,
  deleteAccount,
};
