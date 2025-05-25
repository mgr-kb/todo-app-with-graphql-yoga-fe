import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";

let todos = [
  {
    id: "1",
    text: "Learn GraphQL",
    completed: false,
    owner: { id: "user1", name: "Alice" },
  },
  {
    id: "2", 
    text: "Build Todo App",
    completed: true,
    owner: { id: "user1", name: "Alice" },
  },
  {
    id: "3",
    text: "Deploy to Production", 
    completed: false,
    owner: { id: "user2", name: "Bob" },
  },
];

const typeDefs = `
  type Owner {
    id: ID!
    name: String!
  }

  type Todo {
    id: ID!
    text: String!
    completed: Boolean!
    owner: Owner!
  }

  type AddTodoResponse {
    success: Boolean!
    message: String!
    todo: Todo
  }

  type UpdateTodoResponse {
    success: Boolean!
    message: String!
    todo: Todo
  }

  type DeleteTodoResponse {
    success: Boolean!
    message: String!
  }

  type Query {
    todos: [Todo!]!
  }

  type Mutation {
    addTodo(text: String!): AddTodoResponse!
    updateTodoStatus(id: ID!, completed: Boolean!): UpdateTodoResponse!
    deleteTodo(id: ID!): DeleteTodoResponse!
  }
`;

const resolvers = {
  Query: {
    todos: () => todos,
  },
  Mutation: {
    addTodo: (_: any, { text }: { text: string }) => {
      const newTodo = {
        id: String(Date.now()),
        text,
        completed: false,
        owner: { id: "user1", name: "Alice" },
      };
      todos.push(newTodo);
      return {
        success: true,
        message: "Todo added successfully",
        todo: newTodo,
      };
    },
    updateTodoStatus: (_: any, { id, completed }: { id: string; completed: boolean }) => {
      const todo = todos.find(t => t.id === id);
      if (!todo) {
        return {
          success: false,
          message: "Todo not found",
          todo: null,
        };
      }
      todo.completed = completed;
      return {
        success: true,
        message: "Todo updated successfully",
        todo,
      };
    },
    deleteTodo: (_: any, { id }: { id: string }) => {
      const index = todos.findIndex(t => t.id === id);
      if (index === -1) {
        return {
          success: false,
          message: "Todo not found",
        };
      }
      todos.splice(index, 1);
      return {
        success: true,
        message: "Todo deleted successfully",
      };
    },
  },
};

const yoga = createYoga({
  typeDefs,
  resolvers,
  cors: {
    origin: ['http://localhost:3000'],
    credentials: true,
  },
});

const server = createServer(yoga);

export function startMockServer(port = 4001) {
  return new Promise<void>((resolve) => {
    server.listen(port, () => {
      console.log(`🚀 Mock GraphQL server ready at http://localhost:${port}/graphql`);
      resolve();
    });
  });
}

export function stopMockServer() {
  server.close();
}