import { gql } from "@apollo/client"; // もし `@apollo/client` が不要な場合は適宜削除してください

export const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      text
      completed
      owner {
        id
        name
      }
    }
  }
`;

export const ADD_TODO = gql`
  mutation AddTodo($text: String!) {
    addTodo(text: $text) {
      success
      message
      todo {
        id
        text
        completed
      }
    }
  }
`;

export const UPDATE_TODO_STATUS = gql`
  mutation UpdateTodoStatus($id: ID!, $completed: Boolean!) {
    updateTodoStatus(id: $id, completed: $completed) {
      success
      message
      todo {
        id
        completed
      }
    }
  }
`;

export const DELETE_TODO = gql`
  mutation DeleteTodo($id: ID!) {
    deleteTodo(id: $id) {
      success
      message
      # 削除の場合、返されるtodoは通常nullですが、キャッシュ操作のためにidを要求することがあります
      # スキーマによっては todo { id } がエラーになる可能性もあるため、バックエンドの実装に合わせて調整してください
      # todo {
      #  id
      # }
    }
  }
`;
