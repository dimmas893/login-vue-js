export function authMiddleware(to, from, next) {
    const loggedIn = localStorage.getItem("loggedIn");

    if (!loggedIn) {
        next({ name: "login" });
    } else {
        next();
    }
}

export function guestMiddleware(to, from, next) {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn) {
        next({ name: "dashboard" }); // Redirect logged-in users away from guest routes
    } else {
        next();
    }
}
