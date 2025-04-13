import { User } from "../models/user.model.js"
import { Expense } from "../models/expense.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import xlsx from "xlsx";

const addExpense = async (req, res) => {
    const userId = req.user._id; // from verifyJWT middleware

    const { icon, category, amount, date } = req.body;

    // console.log("Request userId:", userId);
    
    if(!category || !amount || !date) {
        throw new ApiError(400, "All fields are required.");
    }

    const expense = await Expense.create({
        userId: userId,
        icon,
        category,
        amount,
        date: new Date(date)
    })

    if(!expense) {
        throw new ApiError(500, "Unable to add expense.");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                expense: {
                    _id: expense._id,
                    icon: expense.icon,
                    category: expense.category,
                    amount: expense.amount,
                    date: expense.date
                }
            },
            "Expense added Successfully"
        )
    )
}

const getExpenses = async (req, res) => {
    const userId = req.user._id; // from verifyJWT middleware

    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    if(!expenses) {
        throw new ApiError(500, "Unable to fetch expenses.");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                expenses: expenses.map(expense => ({
                    _id: expense._id,
                    icon: expense.icon,
                    category: expense.category,
                    amount: expense.amount,
                    date: expense.date
                }))
            },
            "Expenses fetched Successfully"
        )
    )
}

const deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        return res.status(200).json(
            new ApiResponse(200, {}, "Expense deleted successfully.")
        );
    } catch (error) {
        throw new ApiError(500, "Unable to delete expense.");
    }
}

const downloadExpenseExcel = async (req, res) => {
    const userId = req.user._id;

    // console.log("expenses");
    const expenses = await Expense.find({userId}).sort({date: -1});

    if(!expenses) {
        throw new ApiError(500, "Unable to fetch expenses.");
    }
    
    const data = expenses.map((expense) =>( {
        category: expense.category,
        Amount: expense.amount,
        Date: expense.date.toISOString().split("T")[0], // Format date to YYYY-MM-DD
    }))


    try {
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Expenses");
        xlsx.writeFile(wb, "expenses.xlsx");
        res.download("expenses.xlsx");
    } catch (error) {
        throw new ApiError(500, "Unable to download expense data.");
    }
}

export {
    addExpense,
    getExpenses,
    deleteExpense,
    downloadExpenseExcel
}