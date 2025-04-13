import { Income } from "../models/income.model.js";
import { Expense } from "../models/expense.model.js";
import { ApiError } from "../utils/ApiError.js";
import { isValidObjectId, Types } from "mongoose";
import { ObjectId } from "mongodb"; 
import { GoogleGenerativeAI } from "@google/generative-ai";

const getDashboardData = async (req, res) => {
    try {
        const userId = req.user._id;
        const userObjectId = new ObjectId(String(userId)); // it converts userId (a string) into a MongoDB ObjectId.
    
        const totalIncome = await Income.aggregate([
            { $match: { userId: userObjectId } },
            {
                $group: {
                    _id: null,
                    totalIncome: { $sum: "$amount" },
                },
            },
        ])
    
        // console.log("totalIncome", totalIncome);
    
        const totalExpense = await Expense.aggregate([
            { $match: { userId: userObjectId } },
            {
                $group: {
                    _id: null,
                    totalExpense: { $sum: "$amount" },
                },
            },
        ])
        // console.log("totalExpense", totalExpense);
    
        const last60daysIncomeTransactions = await Income.find({
            userId,
            date: {
                $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
            }
        }).sort({date: -1});
    
        const last60daysIncome = last60daysIncomeTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        )
        
        const last30daysExpenseTransactions = await Expense.find({
            userId,
            date: {
                $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
            }
        }).sort({date: -1});
    
        const last30daysExpense = last30daysExpenseTransactions.reduce(
            (sum, transaction) => sum + transaction.amount, 0
        )
    
        const last5transactions = [
            ...(
                (await Income.find({userId}).sort({date: -1}).limit(5)).map(
                    (transaction) => ({
                        ...transaction.toObject(), // Convert Mongoose document to plain JS object
                        type: "income" // // Add a new field indicating it's an income transaction
                    })
                )
            ),
            ...(
                (await Expense.find({userId}).sort({date: -1}).limit(5)).map(
                    (transaction) => ({
                        ...transaction.toObject(),
                        type: "expense"
                    })
                )
            )
        ].sort((a, b) => b.date - a.date);

        res
        .status(200)
        .json(
            {
                totalBalance: (totalIncome[0]?.totalIncome || 0) - (totalExpense[0]?.totalExpense || 0),
                totalIncome: totalIncome[0]?.totalIncome || 0,
                totalExpense: totalExpense[0]?.totalExpense || 0,
                last30daysExpenses: {
                    total: last30daysExpense,
                    transactions: last30daysExpenseTransactions
                },
                last60daysIncome: {
                    total: last60daysIncome,
                    transactions: last60daysIncomeTransactions
                },
                recentTransactions: last5transactions
            }
        )

    } catch (error) {
        throw new ApiError(500, "Internal Server Error", error.message);
    }  
}


const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getSummary = async (req, res) => {
  try {
    const userId = req.user._id;
    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const formattedData = expenses.map((e) => {
        return `Category: ${e.category}, Amount: ₹${e.amount}, Date: ${new Date(e.date).toDateString()}`;
    }).join("\n");

    if(formattedData.length === 0){
        return res.status(200).json({
            success: true,
            summary: "There are no expenses to summarize!!"
        })
    }
      const prompt = `
      You are an AI financial assistant. Analyze the following list of expenses and give a short 3-4 line natural-language summary of the user's recent spending patterns, top categories, and advice:
      
      ${formattedData}. Don't start like an ongoing conversation.
      `;

    const result = await model.generateContent(prompt);

    const summary = result.response.text();

    return res.status(200).json({
      success: true,
      summary,
    });
  } catch (error) {
    console.error("Summary generation error:", error);
    throw new ApiError(500, "Cannot generate summary", error.message);
  }
};



export {
    getDashboardData, 
    getSummary
};