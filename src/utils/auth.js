// Authentication utility functions

// Get all users from localStorage
export const getUsers = () => {
  const users = localStorage.getItem('lifeline360_users');
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
export const saveUsers = (users) => {
  localStorage.setItem('lifeline360_users', JSON.stringify(users));
};

// Register new user
export const registerUser = (email, password, fullName, role) => {
  const users = getUsers();
  
  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return { success: false, message: 'Email already registered!' };
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { success: false, message: 'Invalid email format!' };
  }

  // Validate password (min 6 characters)
  if (password.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters!' };
  }

  // Create new user
  const newUser = {
    id: Date.now(),
    email,
    password, // In production, hash this password!
    fullName,
    role,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  saveUsers(users);

  return { success: true, message: 'Account created successfully!', user: newUser };
};

// Login user
export const loginUser = (email, password) => {
  const users = getUsers();
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (!user) {
    return { success: false, message: 'Invalid email or password!' };
  }

  // Store current user session
  localStorage.setItem('lifeline360_currentUser', JSON.stringify(user));

  return { success: true, message: 'Login successful!', user };
};

// Get current logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem('lifeline360_currentUser');
  return user ? JSON.parse(user) : null;
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('lifeline360_currentUser');
};

// Check if user is logged in
export const isLoggedIn = () => {
  return getCurrentUser() !== null;
};