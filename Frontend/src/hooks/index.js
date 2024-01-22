import { useContext, useMemo } from "react";
import axios from "axios";
import TokenContext from "../context/token/TokenContact";
import { refreshToken } from "../services/RecipeApi";

function useUser() {
  const { token, user, handleSetToken, loading } = useContext(TokenContext);
  return { user, token, handleSetToken, loading };
}

function useAxiosInterceptor() {
  const { handleSetToken } = useUser();
  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(
    async (config) => {
      const token = await refreshToken();
      handleSetToken(token);
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    },
    (error) => Promise.reject(error)
  );
  return axiosJWT;
}

function useRecipeFilter(recipes, searchParams) {
  const recipeFood = useMemo(() => {
    const keyword =
      searchParams.get("mainIngre") || searchParams.get("title") || "";
    let myRecipes;

    if (searchParams.get("mainIngre")) {
      myRecipes = recipes.filter((recipe) =>
        recipe.main_ingredient
          .toLowerCase()
          .includes(keyword.toLowerCase().trim())
      );
    }

    if (searchParams.get("title")) {
      myRecipes = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(keyword.toLowerCase().trim())
      );
    }

    if (keyword) return myRecipes;
    return recipes;
  }, [recipes, searchParams]);

  return recipeFood;
}

export { useUser, useAxiosInterceptor, useRecipeFilter };
