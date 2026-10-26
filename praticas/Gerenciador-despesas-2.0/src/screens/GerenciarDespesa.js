import React, { useMemo, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  useColorScheme,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { getTheme } from '../constants/theme';
import { useExpenses } from '../store/expenses-context';

const CATEGORIES = ['Alimentação', 'Transporte', 'Lazer', 'Contas', 'Saúde', 'Educação'];

function formatDate(dateValue) {
  const value = dateValue ? new Date(dateValue) : new Date();
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(value);
}

function validate(values) {
  const errors = {};

  if (!values.description || values.description.trim().length < 3) {
    errors.description = 'A descrição deve ter pelo menos 3 caracteres.';
  }

  if (!values.amount || Number(values.amount) <= 0) {
    errors.amount = 'O valor deve ser maior que zero.';
  }

  const data = new Date(values.date);
  const hoje = new Date();
  hoje.setHours(0, 0, 0, 0);

  if (!values.date || Number.isNaN(data.getTime()) || data > hoje) {
    errors.date = 'A data não pode ser futura.';
  }

  if (!values.category) {
    errors.category = 'Selecione uma categoria.';
  }

  return errors;
}

export default function GerenciarDespesa({ navigation, route }) {
  const { expenses, addExpense, updateExpense, deleteExpense } = useExpenses();
  const scheme = useColorScheme();
  const theme = getTheme(scheme === 'dark');
  const expenseId = route?.params?.expenseId;
  const isEditing = Boolean(expenseId);

  const initialForm = useMemo(() => {
    const existingExpense = expenses.find((item) => item.id === expenseId);

    return existingExpense
      ? {
          description: existingExpense.description ?? existingExpense.descricao ?? '',
          amount: String(existingExpense.amount ?? existingExpense.valor ?? ''),
          category: existingExpense.category ?? existingExpense.categoria ?? '',
          date: existingExpense.date ?? existingExpense.data ?? new Date().toISOString(),
        }
      : {
          description: '',
          amount: '',
          category: '',
          date: new Date().toISOString(),
        };
  }, [expenseId, expenses]);

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const handleChange = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  };

  const handleAmountChange = (value) => {
    const regex = /^\d*\.?\d{0,2}$/;
    if (regex.test(value)) {
      handleChange('amount', value);
    }
  };

  const submit = () => {
    const nextErrors = validate(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    const payload = {
      id: isEditing ? expenseId : String(Date.now()),
      description: form.description.trim(),
      amount: Number.parseFloat(form.amount),
      category: form.category,
      date: new Date(form.date).toISOString(),
    };

    if (isEditing) {
      updateExpense(payload);
    } else {
      addExpense(payload);
    }

    navigation.goBack();
  };

  const handleDelete = () => {
    Alert.alert('Excluir despesa', 'Deseja realmente excluir esta despesa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          deleteExpense(expenseId);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.background }]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Descrição</Text>
          <TextInput
            value={form.description}
            onChangeText={(value) => handleChange('description', value)}
            placeholder="Ex: Supermercado"
            placeholderTextColor={theme.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: theme.surface,
                borderColor: errors.description ? theme.danger : theme.border,
                color: theme.text,
              },
            ]}
          />
          {errors.description ? <Text style={[styles.error, { color: theme.danger }]}>{errors.description}</Text> : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Valor</Text>
          <TextInput
            value={form.amount}
            onChangeText={handleAmountChange}
            placeholder="0.00"
            keyboardType="decimal-pad"
            placeholderTextColor={theme.textMuted}
            style={[
              styles.input,
              {
                backgroundColor: theme.surface,
                borderColor: errors.amount ? theme.danger : theme.border,
                color: theme.text,
              },
            ]}
          />
          {errors.amount ? <Text style={[styles.error, { color: theme.danger }]}>{errors.amount}</Text> : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Categoria</Text>
          <Pressable
            onPress={() => setShowCategoryModal(true)}
            style={[
              styles.input,
              styles.picker,
              {
                backgroundColor: theme.surface,
                borderColor: errors.category ? theme.danger : theme.border,
              },
            ]}
          >
            <Text style={{ color: form.category ? theme.text : theme.textMuted }}>
              {form.category || 'Selecione uma categoria'}
            </Text>
          </Pressable>
          {errors.category ? <Text style={[styles.error, { color: theme.danger }]}>{errors.category}</Text> : null}
        </View>

        <View style={styles.formGroup}>
          <Text style={[styles.label, { color: theme.text }]}>Data</Text>
          <Pressable
            onPress={() => setShowDatePicker(true)}
            style={[
              styles.input,
              { backgroundColor: theme.surface, borderColor: errors.date ? theme.danger : theme.border },
            ]}
          >
            <Text style={{ color: theme.text }}>{formatDate(form.date)}</Text>
          </Pressable>
          {errors.date ? <Text style={[styles.error, { color: theme.danger }]}>{errors.date}</Text> : null}
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={new Date(form.date)}
            mode="date"
            display="default"
            onChange={(_, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                handleChange('date', selectedDate.toISOString());
              }
            }}
          />
        )}

        <View style={styles.actionsRow}>
          {isEditing ? (
            <Pressable style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
              <Text style={styles.deleteButtonText}>Excluir</Text>
            </Pressable>
          ) : null}

          <Pressable style={[styles.button, styles.saveButton]} onPress={submit}>
            <Text style={styles.saveButtonText}>{isEditing ? 'Salvar' : 'Cadastrar'}</Text>
          </Pressable>
        </View>
      </ScrollView>

      <Modal transparent animationType="slide" visible={showCategoryModal} onRequestClose={() => setShowCategoryModal(false)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.surface }]}> 
            <Text style={[styles.modalTitle, { color: theme.text }]}>Selecione a categoria</Text>
            {CATEGORIES.map((category) => (
              <Pressable
                key={category}
                onPress={() => {
                  handleChange('category', category);
                  setShowCategoryModal(false);
                }}
                style={[
                  styles.categoryItem,
                  form.category === category && { backgroundColor: theme.primarySoft },
                ]}
              >
                <Text style={{ color: form.category === category ? theme.primary : theme.text }}>{category}</Text>
              </Pressable>
            ))}
            <Pressable style={[styles.closeButton, { backgroundColor: theme.chip }]} onPress={() => setShowCategoryModal(false)}>
              <Text style={{ color: theme.text }}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  formGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  picker: {
    justifyContent: 'center',
  },
  error: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: '600',
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 18,
    gap: 12,
  },
  button: {
    flex: 1,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ef4444',
    marginRight: 8,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  saveButton: {
    backgroundColor: '#16a34a',
    marginLeft: 8,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '700',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.35)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    borderRadius: 16,
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
  },
  categoryItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
  },
  closeButton: {
    marginTop: 14,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 12,
  },
});
