import { User } from "../models/user.model.js"
import { Income } from "../models/income.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import xlsx from "xlsx";

const addIncome = async (req, res) => {
    const userId = req.user._id; // from verifyJWT middleware

    const { icon, source, amount, date } = req.body;

    // console.log("Request userId:", userId);
    
    if(!source || !amount || !date) {
        throw new ApiError(400, "All fields are required.");
    }

    const income = await Income.create({
        userId: userId,
        icon,
        source,
        amount,
        date: new Date(date)
    })

    if(!income) {
        throw new ApiError(500, "Unable to add income.");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                income: {
                    _id: income._id,
                    icon: income.icon,
                    source: income.source,
                    amount: income.amount,
                    date: income.date
                }
            },
            "Income added Successfully"
        )
    )
}

const getIncomes = async (req, res) => {
    const userId = req.user._id; // from verifyJWT middleware

    const incomes = await Income.find({ userId }).sort({ date: -1 });

    if(!incomes) {
        throw new ApiError(500, "Unable to fetch incomes.");
    }

    return res
    .status(200)
    .json(
        new ApiResponse(
            200, 
            {
                incomes: incomes.map(income => ({
                    _id: income._id,
                    icon: income.icon,
                    source: income.source,
                    amount: income.amount,
                    date: income.date
                }))
            },
            "Incomes fetched Successfully"
        )
    )
}

const deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        return res.status(200).json(
            new ApiResponse(200, {}, "Income deleted successfully.")
        );
    } catch (error) {
        throw new ApiError(500, "Unable to delete income.");
    }
}

const downloadIncomeExcel = async (req, res) => {
    const userId = req.user._id;

    const incomes = await Income.find({userId}).sort({date: -1});

    if(!incomes) {
        throw new ApiError(500, "Unable to fetch incomes.");
    }

    const data = incomes.map((income) =>( {
        Source: income.source,
        Amount: income.amount,
        Date: income.date.toISOString().split("T")[0], // Format date to YYYY-MM-DD
    }))


    try {
        const wb = xlsx.utils.book_new();
        const ws = xlsx.utils.json_to_sheet(data);
        xlsx.utils.book_append_sheet(wb, ws, "Incomes");
        xlsx.writeFile(wb, "incomes.xlsx");
        res.download("incomes.xlsx");
    } catch (error) {
        throw new ApiError(500, "Unable to download income data.");
    }
}

export {
    addIncome,
    getIncomes,
    deleteIncome,
    downloadIncomeExcel
}