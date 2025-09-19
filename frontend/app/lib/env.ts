const BASE_URL = process.env.EXPO_PUBLIC_API_URL;
    if (!BASE_URL){
            throw new Error("Falta EXPO_PUBLIC_API_URL. Define el .env en la raíz y reinicia Expo.");
    }
export {BASE_URL};

// en cualquier parte temporalmente
