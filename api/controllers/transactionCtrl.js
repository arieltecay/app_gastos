const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transaction = require("../model/Transaction");

const transactionCtrl = {
    create: asyncHandler(async (req, res) => {
        const { type, category, amount, date, description } = req.body;
        if (!type || !amount || !date) {
            res.status(400);
            throw new Error("Type,amount, and date are required");
        }
        const transactionCreated = await transaction.create({
            type,
            category,
            amount,
            date,
            description,
            user: req.user,
        });
        res.status(201).json(transactionCreated);
    }),
    lists: asyncHandler(async (req, res) => {
        const { page, limitPerPage = 10 } = req.query;

        try {
            const transactions = await transaction.find({ user: req.user })
                .sort({ date: -1 })
                .skip((page - 1) * limitPerPage)
                .limit(limitPerPage);

            const totalTransactions = await transaction.countDocuments({ user: req.user });
            const totalPages = Math.ceil(totalTransactions / limitPerPage);

            res.status(200).json({
                transactions,
                totalTransactions,
                totalPages,
                currentPage: page
            });
        } catch (error) {
            res.status(500).json({ message: "Error fetching transactions", error });
        }
    }),

    getFilteredTransactions: asyncHandler(async (req, res) => {
        const { startDate, endDate, type, category, page = 1, limit = 10 } = req.query;
        const filter = { user: req.user };
        if (startDate && endDate) {
            filter.date = { $gte: startDate, $lte: endDate };
        }
        if (type) {
            filter.type = type;
        }
        if (category) {
            if (category === 'all') {
            } else if (category === 'Uncategorized') {
                filter.category = 'Uncategorized';
            } else {
                filter.category = category;
            }
        }
        const transactions = await transaction.find(filter)
            .sort({ date: -1 })
            .skip((Number(page) - 1) * limit)
            .limit(Number(limit));
        const total = await transaction.countDocuments(filter);
        res.status(200).json({
            page: Number(page),
            limit: Number(limit),
            total: total,
            totalPages: Math.ceil(total / limit),
            transactions,
        });
    }),
    update: asyncHandler(async (req, res) => {
        const transactionId = req.params.id;
        if (!transactionId && transactionId.user.toString() !== req.user.toString()) {
            res.status(401);
            throw new Error("You are not authorized to update this transaction");
        }
        const { type, category, amount, date, description } = req.body;
        const transactionUpdated = await transaction.findByIdAndUpdate(
            transactionId,
            {
                type,
                category,
                amount,
                date,
                description,
            },
            { new: true }
        );
        res.status(200).json(transactionUpdated);
    }),
    delete: asyncHandler(async (req, res) => {
        const transactionId = req.params.id;
        if (!transactionId && transactionId.user.toString() !== req.user.toString()) {
            res.status(401);
            throw new Error("You are not authorized to delete this transaction");
        }
        await transaction.findByIdAndDelete(transactionId);
        res.status(200).json({ message: "Transaction deleted" });
    }),
    getTotalAmount: asyncHandler(async (req, res) => {
        const { startDate, endDate, type, category } = req.query;
        let filter = { user: req.user };
        if (startDate && endDate) {
            filter.date = { $gte: startDate, $lte: endDate };
        }
        if (type) {
            filter.type = type;
        }
        if (category) {
            if (category === 'all') {
                // do nothing
            } else if (category === 'Uncategorized') {
                filter.category = 'Uncategorized';
            } else {
                filter.category = category;
            }
        }
        const transactions = await transaction.find(filter);
        const totalAmount = transactions.reduce((acc, curr) => {
            if (curr.type === 'expense') {
                return acc - curr.amount;
            } else {
                return acc + curr.amount;
            }
        }, 0);
        res.status(200).json({ totalAmount });
    }),
    print: asyncHandler(async (req, res) => {
        const transactionId = req.params.id;
        const transactionFound = await transaction.findById(transactionId);
        if (!transactionFound) {
            res.status(404);
            throw new Error("Transaction not found");
        }
        res.status(200).json(transactionFound);
    }),
};

module.exports = transactionCtrl;
