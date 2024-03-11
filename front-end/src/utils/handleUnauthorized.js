import { logout } from "@/services/auth.service";

async function handleUnauthorized() {
    try {
        await logout();
    } catch (error) {
        console.error("Error al manejar la autorización no autorizada:", error);
        await logout();
    }
}

export { handleUnauthorized };
