# %% [markdown]
# # Pre-Setup

# %% [markdown]
# ## Turning off unneccessary warnings.

# %%
import warnings
warnings.filterwarnings('ignore')

# %% [markdown]
# ## Libraries Install

# %% [markdown]
# # 1. Exploratory Data Analysis

# %% [markdown]
# # 2. Data Preprocessing

# %% [markdown]
# ## Libraries Import
# Importing library for importing data and preprocessing data.

# %%
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import statsmodels.api as sm
import scipy.stats as sp

# %% [markdown]
# ## Data Import
# Using pandas to import the data from "Obesity prediction.csv" as a dataframe -> Matrix Like object.

# %%
# import kagglehub

# Download latest version
# path = kagglehub.dataset_download("ruchikakumbhar/obesity-prediction") + "/Obesity prediction.csv"
path = './Obesity prediction.csv'

print("Path to dataset files:", path)

# %%
df = pd.read_csv(path)
df.head(5)

# %%
df['MTRANS'].value_counts()

# %% [markdown]
# ## Data General Info
# General Data Information including data types, null value counts, and the statistical info for each column.

# %% [markdown]
# ### Columns and Data Types

# %%
df.info()

# %%
df.describe(include='all')

# %%
obesity_dist = df['Obesity'].value_counts()
obesity_dist

# %% [markdown]
# ### Missing Data

# %%
print(df.isnull().sum())
print()
print(f'Total missing data: {df.isnull().sum().sum()}')

# %% [markdown]
# There is no missing data in the dataset.

# %% [markdown]
# ## Duplicate Data
# Checking for duplicate rows, and handling them. Because this is a dataset of people with Obesity category, then duplicate data does not matter because we are not accounting demography or the occurence of the same condition twice for each person, so we can remove the duplicate.

# %% [markdown]
# ### Checking for Duplicate Data

# %%
print(f"Duplicate row count: {df.duplicated().sum()}")

# %%
print("Duplicated Data:")
indices = [i for i in df.duplicated().index if df.duplicated()[i]]
print(df.loc[indices])

# %% [markdown]
# ### Removing Duplicate Data

# %%
df.drop_duplicates(inplace=True)
df.reset_index(drop=True, inplace=True)
df

# %%
print(f"Row count after dropping duplicates: {df.shape[0]}")

# %% [markdown]
# ## Outliers
# Checking for rows with extreme numerical data points

# %% [markdown]
# ### Checking for Continuous Data

# %%
# countinuous_columns = [attr for attr in df.dtypes.index if df.dtypes[attr] == 'int64' or df.dtypes[attr] == 'float64']
continuous_columns = ['Age', 'Height', 'Weight']
print(f"Continuous Columns: {continuous_columns}")

# %%
continuous_indices = [i for i in range(len(df.columns.values)) if df.columns.values[i] in continuous_columns]
continuous_df = df.iloc[:, continuous_indices]
continuous_df

# %% [markdown]
# ### Continuous Data Distributions

# %% [markdown]
# #### Distributions Plot

# %%
plt.figure(figsize=(16,5))
plt.subplot(1,3,1)
sns.distplot(continuous_df['Age'])
plt.subplot(1,3,2)
sns.distplot(continuous_df['Height'])
plt.subplot(1,3,3)
sns.distplot(continuous_df['Weight'])
plt.show()

# %% [markdown]
# #### Q-Q Plot

# %%
sm.qqplot(continuous_df['Age'], line='45')
plt.show()

# %%
sm.qqplot(continuous_df['Height'], line='45')
plt.show()

# %%
sm.qqplot(continuous_df['Weight'], line='45')
plt.show()

# %% [markdown]
# #### Skewness and Kurtosis

# %%
print("Age")
print(f"Kurtosis: {sp.kurtosis(continuous_df['Age'])}")
print(f"Skewness: {sp.skew(continuous_df['Age'])}")
print("Height")
print(f"Kurtosis: {sp.kurtosis(continuous_df['Height'])}")
print(f"Skewness: {sp.skew(continuous_df['Height'])}")
print("Weight")
print(f"Kurtosis: {sp.kurtosis(continuous_df['Weight'])}")
print(f"Skewness: {sp.skew(continuous_df['Weight'])}")

# %% [markdown]
# #### Shapiro-Wilk Test

# %%
stat, p = sp.shapiro(continuous_df['Age'])
print('Statistics=%.3f, p=%.4f' % (stat, p))

# %%
stat, p = sp.shapiro(continuous_df['Height'])
print('Statistics=%.3f, p=%.4f' % (stat, p))

# %%
stat, p = sp.shapiro(continuous_df['Weight'])
print('Statistics=%.3f, p=%.4f' % (stat, p))

# %% [markdown]
# #### Result

# %% [markdown]
# Age: Heavily Right-Skewed. -> IQR<br>
# Height: Slightly Left-Skewed. -> Percentile-Based<br>
# Weight: Slightly Right-Skewed. -> Percentile-Based

# %% [markdown]
# ### Outliers Detection

# %%
q1, q3 = df['Age'].quantile([0.25, 0.75]).values
iqr = q3 - q1

lower_bound = q1 - 1.5 * iqr
upper_bound = q3 + 1.5 * iqr

age_bounds = (df['Age'] >= lower_bound) & (df['Age'] <= upper_bound)
print(f"Age outlier count: {age_bounds.count() - age_bounds.sum()}")

# %%
p1, p99 = df['Height'].quantile([0.01, 0.99]).values
height_bounds = (df['Height'] >= p1) & (df['Height'] <= p99)
print(f"Height outlier count: {height_bounds.count() - height_bounds.sum()}")

# %%
p1, p99 = df['Weight'].quantile([0.01, 0.99]).values
weight_bounds = (df['Weight'] >= p1) & (df['Weight'] <= p99)
print(f"Weight outlier count: {weight_bounds.count() - weight_bounds.sum()}")

# %%
df_without_outliers = df.loc[age_bounds & height_bounds & weight_bounds]
print(f"Outlier portion: {round(((df.shape[0] - df_without_outliers.shape[0])/df.shape[0])*100, 3)}%")

# %%
print(f"Before outlier removal count: {df.shape[0]}")
print(f"After outlier removal count: {df_without_outliers.shape[0]}")

# %%
df = df.loc[age_bounds & height_bounds & weight_bounds]
df.reset_index(drop=True, inplace=True)
df

# %% [markdown]
# ### Results

# %% [markdown]
# The dataset has around 11.4% outliers, all of them from Age, Height, and Weight. Because the outlier is more than 10% and they come from, theoritically, most contributing features, the decision is to not remove them, but let them be because they are most likely natural outliers.

# %% [markdown]
# ## Data Balance

# %%
obesity_dist = df['Obesity'].value_counts(normalize=True)

plt.figure(figsize=(16, 8))
plt.bar(obesity_dist.index, obesity_dist.values, color='pink')

plt.xlabel('Obesity Category')
plt.ylabel('Count')
plt.title('Distribution of Obesity Categories')
plt.xticks(rotation=45)

plt.show()

# %%
print(obesity_dist)

# %%
print(f"Max: {round(obesity_dist.max(), 3)}")
print(f"Min: {round(obesity_dist.min(), 3)}")

# %% [markdown]
# The attribute proportions are around ~0.128-10.168, which is balanced

# %% [markdown]
# # 3. Features Engineering

# %% [markdown]
# ## Data Encoding

# %% [markdown]
# ### Determining Column Types

# %% [markdown]
# There are 2 main types of data, Numerical and Categorical.<br>
# For numerical data, there are discrete and continuous data.<br>
# For categorical data, there are ordinal and nominal data.

# %%
continuous_column_names = ['Age', 'Height', 'Weight', 'CH2O', 'FAF', 'TUE']
discrete_column_names = ['FCVC', 'NCP']
nominal_column_names = ['Gender', 'family_history', 'FAVC', 'SMOKE', 'SCC', 'MTRANS']
ordinal_column_names = ['CAEC', 'CALC']
label = ['Obesity'] # Ordinal

# %% [markdown]
# ### Ordinal Data
# There are two Ordinal Columns: 'CAEC', and 'CALC'.

# %%
print(f"CAEC Unique Values: {df['CAEC'].unique()}")
print(f"CALC Unique Values: {df['CALC'].unique()}")

# %% [markdown]
# It can be seen that both CAEC and CALC have the same unique values with both of them having ordinal data, which means each has a ranking of each own with evenly spaced category -> Ordinal Encoder.

# %%
from sklearn.preprocessing import OrdinalEncoder

ordinal_encoder = OrdinalEncoder()
df[ordinal_column_names] = ordinal_encoder.fit_transform(df[ordinal_column_names])
df

# %% [markdown]
# ### Nominal Data

# %%
df[nominal_column_names] = ordinal_encoder.fit_transform(df[nominal_column_names])
df

# %% [markdown]
# ### Label

# %%
target_labels = {
    'Insufficient_Weight': 0,
    'Normal_Weight': 1,
    'Overweight_Level_I': 2,
    'Overweight_Level_II': 3,
    'Obesity_Type_I': 4,
    'Obesity_Type_II': 5,
    'Obesity_Type_III': 6,
}

# %%
df['Obesity'] = df['Obesity'].replace(target_labels)
df

# %% [markdown]
# ## Features Selection

# %%
sns.heatmap(df.corr(method="spearman"))
plt.show()

# %%
data_corr = df.corr()
[(col, row) for col in data_corr.columns for row in data_corr.index if data_corr.loc[col, row] > 0.6 and col != row and col != 'Obesity' and row != 'Obesity']

# %%
print(f"Correlation between Gender and Obesity: {abs(data_corr['Gender']['Obesity'])}")
print(f"Correlation between Height and Obesity: {abs(data_corr['Height']['Obesity'])}")

# %% [markdown]
# # 4. Model Selection

# %% [markdown]
# # 5. Model Training

# %% [markdown]
# ## Evaluation

# %%
from sklearn.model_selection import cross_val_score
from sklearn.metrics import roc_auc_score, confusion_matrix, f1_score, recall_score, precision_score, roc_curve, auc

def print_eval(model, X_train, X_test, y_train, y_test, df_X, df_y, cv=5, multi_class='ovo', average='macro'):
    print("Training Accuracy:", model.score(X_train, y_train))
    print("Test Accuracy:", model.score(X_test, y_test))
    
    scores = cross_val_score(model, df_X, df_y, cv=cv)
    print("Cross Validation Scores:", scores)
    print("Average CV Score:", scores.mean())

    y_train_pred = model.predict(X_train)
    y_test_pred = model.predict(X_test)

    train_labels = np.unique(y_train)
    test_labels = np.unique(y_test)

    print(f'Train Confusion Matrix: {confusion_matrix(y_train, y_train_pred, labels=train_labels)}')
    print(f'Test Confusion Matrix: {confusion_matrix(y_test, y_test_pred, labels=test_labels)}')

    # if hasattr(model, "predict_proba"):
    #     y_train_proba = model.predict_proba(X_train)
    #     y_test_proba = model.predict_proba(X_test)
    #     print(f'Train AUC: {roc_auc_score(y_train, y_train_proba, multi_class=multi_class)}')
    #     print(f'Test AUC: {roc_auc_score(y_test, y_test_proba, multi_class=multi_class)}')

    #     n_classes = y_test_proba.shape[1]

    #     plt.figure(figsize=(8, 6))
    #     for i in range(n_classes):
    #         fpr, tpr, thresholds = roc_curve(y_test == i, y_test_proba[:, i])
    #         plt.plot(fpr, tpr, label=f'Class {i}')

    #     fpr, tpr, thresholds = roc_curve(y_test, y_test_proba)
    #     roc_auc = auc(fpr, tpr)

        # plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC Curve (AUC: {roc_auc:.2f})')
        # plt.plot([0, 1], [0, 1], color='navy', lw=2)
    #     plt.xlabel('False Positive Rate')
    #     plt.ylabel('True Positive Rate')
    #     plt.title('Receiver Operating Characteristic (ROC) Curve')
    #     plt.legend(loc='lower right')
    #     plt.show()
    # else:
    #     print("AUC not available: Model does not support probability predictions.")

    print(f'Train Recall Score: {recall_score(y_train, y_train_pred, labels=train_labels, average=average)}')
    print(f'Test Recall Score: {recall_score(y_test, y_test_pred, labels=test_labels, average=average)}')

    print(f'Train Precision Score: {precision_score(y_train, y_train_pred, labels=train_labels, average=average)}')
    print(f'Test Precision Score: {precision_score(y_test, y_test_pred, labels=test_labels, average=average)}')

    print(f'Train F1 Score: {f1_score(y_train, y_train_pred, labels=train_labels, average=average)}')
    print(f'Test F1 Score: {f1_score(y_test, y_test_pred, labels=test_labels, average=average)}')

# %% [markdown]
# ## Model

# %%
df_X = df.drop(columns=['Gender', 'Obesity'])
df_y = df['Obesity']

# %%
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(
    df_X, df_y, test_size=0.33, random_state=42)
df_X.shape

# %%
from sklearn.ensemble import RandomForestClassifier

clf = RandomForestClassifier(max_depth=4, random_state=0)
clf.fit(X_train, y_train)

# %%
prediction = pd.DataFrame(clf.predict(X_test)).replace(target_labels, inplace=True)
prediction

# %%
print("Training Accuracy:", clf.score(X_train, y_train))
print("Test Accuracy:", clf.score(X_test, y_test))

# %%
from sklearn.model_selection import cross_val_score
scores = cross_val_score(clf, df_X, df_y, cv=5)
print("Cross Validation Scores:", scores)
print("Average CV Score:", scores.mean())

# %% [markdown]
# # 6. Hyperparameter Tuning

# %%
hyperparameters = {
  'n_estimators': np.linspace(100, 500, 17, dtype=int),
  'criterion': ["gini", "entropy"],
  'max_depth': np.linspace(1, 4, 1, dtype=int),
  'min_samples_split': np.linspace(1, 6, 6, dtype=int),
  'min_samples_leaf': np.linspace(1, 6, 6, dtype=int),
  'max_features': ["sqrt", "log2"]
}
hyperparameters

# %%
total_hyperparams = [len(attr) for attr in hyperparameters.values()]
total_model_count = 0
for i in total_hyperparams:
  if total_model_count == 0:
    total_model_count = i
  else:
    total_model_count *= i
print(f"Total Models: {total_model_count}")
print(f"Total Calc: {total_model_count * 5}")

# %%
# from sklearn.model_selection import GridSearchCV
# gridSearch = GridSearchCV(clf, hyperparameters, n_jobs=-1, verbose=2)
# gridSearch.fit(X_train, y_train)

# %%
new_clf = RandomForestClassifier(criterion='entropy', max_depth=4, min_samples_leaf=4,
                        n_estimators=175, random_state=0)

new_clf.fit(X_train, y_train)

# %%
print("Training Accuracy:", new_clf.score(X_train, y_train))
print("Test Accuracy:", new_clf.score(X_test, y_test))

# %%
from sklearn.model_selection import cross_val_score
scores = cross_val_score(new_clf, df_X, df_y, cv=5)
print("Cross Validation Scores:", scores)
print("Average CV Score:", scores.mean())

# %%
y_train_pred = new_clf.predict_proba(X_train)
y_test_pred = new_clf.predict_proba(X_test)
y_train_pred[0][:5], y_test_pred[0][:5]

# %%
from sklearn.metrics import roc_auc_score

print(f'Train AUC: {roc_auc_score(y_train, y_train_pred, multi_class='ovr')}')
print(f'Test AUC: {roc_auc_score(y_test, y_test_pred, multi_class='ovr')}')

# %%
feature_importances = pd.Series(new_clf.feature_importances_, index=X_train.columns)
feature_importances.nlargest(10).plot(kind='barh')

# %%
pd.DataFrame(new_clf.predict(X_test), columns=['Obesity']).value_counts(normalize=True)

# %%
print_eval(new_clf, X_train, X_test, y_train, y_test, df_X, df_y)

# %% [markdown]
# # 7. Model Deployment

# %%
import pickle

filename = "model.pkl"
pickle.dump(new_clf, open(filename, 'wb'))


