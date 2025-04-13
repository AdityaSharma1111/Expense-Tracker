import express from "express";
import cors from "cors"
import authRouter from './routes/auth.routes.js'
import incomeRouter from './routes/income.routes.js'
import cookieParser from "cookie-parser";
import expenseRouter from './routes/expense.routes.js'
import dashboardRouter from './routes/dashboard.routes.js'

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true, limit: "16kb" }));


app.use("/api/v1/auth", authRouter);
app.use("/api/v1/income", incomeRouter);
app.use("/api/v1/expense", expenseRouter);
app.use("/api/v1/dashboard", dashboardRouter);

// without this the error is coming in html format
app.use((err, req, res, next) => {
    console.error("🚨 Global Error Handler:", err);

    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
        errors: err.errors || [],
        stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
    });
});



export { app };
