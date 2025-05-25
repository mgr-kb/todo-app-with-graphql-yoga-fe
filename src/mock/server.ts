import { createYoga } from "graphql-yoga";

// Mock data store
let todos = [
  {
    id: "1",
    text: "Learn GraphQL",
    completed: false,
    owner: { id: "user1", name: "Alice" }
  },
  {
    id: "2", 
    text: "Build Todo App",
    completed: true,
    owner: { id: "user1", name: "Alice" }
  },
  {
    id: "3",
    text: "Deploy to production",
    completed: false,
    owner: { id: "user2", name: "Bob" }
  }
];

let nextId = 4;

// GraphQL schema
const typeDefs = `
  type User {
    id: ID!
    name: String!
  }

  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
    owner: User!
  }

  type TodoResponse {
    success: Boolean!
    message: String!
    todo: Todo
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(text: String!): TodoResponse!
    updateTodoStatus(id: ID!, completed: Boolean!): TodoResponse!
    deleteTodo(id: ID!): TodoResponse!
  }
`;

// Resolvers
const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    addTodo: (_: any, { text }: { text: string }) => {
      const newTodo = {
        id: nextId.toString(),
        text,
        completed: false,
        owner: { id: "user1", name: "Alice" }
      };
      todos.push(newTodo);
      nextId++;
      return {
        success: true,
        message: "Todo added successfully",
        todo: newTodo
      };
    },
    updateTodoStatus: (_: any, { id, completed }: { id: string; completed: boolean }) => {
      const todo = todos.find(t => t.id === id);
      if (!todo) {
        return {
          success: false,
          message: "Todo not found",
          todo: null
        };
      }
      todo.completed = completed;
      return {
        success: true,
        message: "Todo status updated successfully",
        todo
      };
    },
    deleteTodo: (_: any, { id }: { id: string }) => {
      const todoIndex = todos.findIndex(t => t.id === id);
      if (todoIndex === -1) {
        return {
          success: false,
          message: "Todo not found"
        };
      }
      todos.splice(todoIndex, 1);
      return {
        success: true,
        message: "Todo deleted successfully"
      };
    }
  }
};

export const yoga = createYoga({
  schema: {
    typeDefs,
    resolvers
  },
  graphqlEndpoint: "/graphql",
  cors: {
    origin: ["http://localhost:3000"],
    credentials: true
  }
});