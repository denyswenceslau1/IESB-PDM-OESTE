import React, { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ExpensesContext = createContext();

const STORAGE_KEY = '@expenses';

const initialExpenses = [
  {
    id: '1',
    description: 'Mercado',
    amount: 145.8,
    category: 'Alimentação',
    date: '2026-10-15T12:00:00.000Z',
  },
  {
    id: '2',
    description: 'Combustível',
    amount: 210.35,
    category: 'Transporte',
    date: '2026-10-18T08:30:00.000Z',
  },
  {
    id: '3',
    description: 'Cinema',
    amount: 48.9,
    category: 'Lazer',
    date: '2026-10-12T19:00:00.000Z',
  },
  {
    id: '4',
    description: 'Internet',
    amount: 89.99,
    category: 'Contas',
    date: '2026-10-10T10:00:00.000Z',
  },
];

function expensesReducer(state, action) {
  switch (action.type) {
    case 'SET':
      return action.payload ?? [];
    case 'ADD':
      return [action.payload, ...state];
    case 'UPDATE':
      return state.map((expense) =>
        expense.id === action.payload.id ? action.payload : expense,
      );
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

export function ExpensesContextProvider({ children }) {
  const [expenses, dispatch] = useReducer(expensesReducer, initialExpenses);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        const storedExpenses = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedExpenses) {
          const parsed = JSON.parse(storedExpenses);
          if (Array.isArray(parsed)) {
            dispatch({ type: 'SET', payload: parsed });
          }
        }
      } catch (error) {
        console.error('Erro ao carregar despesas:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadExpenses();
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const saveExpenses = async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
      } catch (error) {
        console.error('Erro ao salvar despesas:', error);
      }
    };

    saveExpenses();
  }, [expenses, isLoaded]);

  const addExpense = (expense) => {
    dispatch({ type: 'ADD', payload: expense });
  };

  const updateExpense = (updatedExpense) => {
    dispatch({ type: 'UPDATE', payload: updatedExpense });
  };

  const deleteExpense = (expenseId) => {
    dispatch({ type: 'DELETE', payload: expenseId });
  };

  const value = useMemo(
    () => ({ expenses, addExpense, updateExpense, deleteExpense }),
    [expenses],
  );

  return (
    <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>
  );
}

export function useExpenses() {
  const context = useContext(ExpensesContext);

  if (!context) {
    throw new Error('useExpenses deve ser usado dentro de ExpensesContextProvider');
  }

  return context;
}
