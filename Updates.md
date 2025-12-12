
### Updates Implemented:

Here's a summary of the changes I've made to your project:

1.  **Fixed Build Error for Dashboard Component:**
    *   **File:** `MANA_PANI/frontend/src/pages/Dashboard.tsx`
    *   **Change:** Added `export default Dashboard;` to correctly export the Dashboard component, resolving the build failure where `App.tsx` couldn't import it.

2.  **Implemented Password Visibility Toggle:**
    *   **File:** `MANA_PANI/frontend/src/pages/Login.tsx`
    *   **Change:** Added an "eye" icon next to the password input field. Clicking this icon toggles the visibility of the entered password, switching between `password` and `text` input types.

3.  **Implemented Admin/User Role Selection:**
    *   **File:** `MANA_PANI/frontend/src/pages/Login.tsx`
    *   **Change:** Added radio buttons to the login form, allowing the user to select "User" or "Admin" as their login role. This selection is sent to the backend during authentication.

4.  **Fixed `ERR_CONNECTION_REFUSED` (API URL):**
    *   **File:** `MANA_PANI/frontend/src/services/api.ts`
    *   **Change:** Modified the `baseURL` for API requests from `http://localhost:8080` to an empty string (`''`). This ensures that the frontend makes relative API calls, correctly targeting the backend on deployed environments (like Render) and resolving the connection refused error.

5.  **Configured CORS in Backend:**
    *   **File:** `MANA_PANI/backend/src/main/java/com/mana_pani/security/WebSecurityConfig.java`
    *   **Change:** Added a `CorsConfigurationSource` bean to the Spring Security configuration. This enables Cross-Origin Resource Sharing (CORS), allowing your frontend and backend to communicate successfully when hosted on different domains.

6.  **Updated Backend Login Request DTO:**
    *   **File:** `MANA_PANI/backend/src/main/java/com/mana_pani/dto/LoginRequest.java`
    *   **Change:** Added a `userType` field to this DTO, enabling the backend to receive the selected role (User/Admin) from the frontend login form.

7.  **Implemented Role-Based Login Logic in Backend:**
    *   **File:** `MANA_PANI/backend/src/main/java/com/mana_pani/controller/AuthController.java`
    *   **Change:** Modified the `authenticateUser` method. After successful authentication, it now checks if the authenticated user's actual roles (fetched from the database) match the `userType` selected by the user in the login form. If there's a mismatch (e.g., a regular user tries to log in as Admin), access is denied.

8.  **Hardcoded Admin Credentials (Frontend Safeguard):**
    *   **File:** `MANA_PANI/frontend/src/pages/Login.tsx`
    *   **Change:** When "Admin" is selected in the role radio buttons, the username and password fields are automatically pre-filled with "GRS" and "GRS-Mahi" respectively.
    *   The username and password input fields become `disabled` when "Admin" is selected, preventing manual edits.
    *   A development-only safeguard comment has been added to the code, emphasizing that hardcoding credentials is insecure and should be changed for production.

9.  **Fixed Login Navigation:**
    *   **File:** `MANA_PANI/frontend/src/pages/Login.tsx`
    *   **Change:** Replaced `navigate("/dashboard")` with `window.location.href = "/dashboard"` after a successful login. This forces a full page reload, effectively resolving timing issues where React might not have updated the authentication context before attempting navigation, ensuring the user is reliably redirected to the dashboard.

10. **PWA Manifest:**
    *   **File:** `MANA_PANI/frontend/public/manifest.json`
    *   **Change:** Created a `manifest.json` file with standard PWA configurations and icon references (`favicon.ico`, `logo192.png`, `logo512.png`). This should address the PWA icon manifest warning, assuming the `logo192.png` and `logo512.png` files are present in the `public` directory.

These changes collectively address all the issues you reported, from build failures and deployment problems to login functionality and security considerations. To see these changes reflected on Render, please ensure your Render services are configured for auto-deployment from your GitHub repository (as detailed in the "Render Deployment Fix Steps" I previously provided).
