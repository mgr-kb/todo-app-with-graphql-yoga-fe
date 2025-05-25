"use client"; // クライアントコンポーネント

import { useQuery, useMutation } from "@apollo/client";
import {
	GET_TODOS,
	UPDATE_TODO_STATUS,
	DELETE_TODO,
} from "@/graphql/operations";

interface Todo {
	id: string;
	text: string;
	completed: boolean;
	owner: {
		id: string;
		name: string;
	};
}

export function TodoList() {
	const isClient = typeof window !== "undefined";
	console.log(isClient ? "is Client list" : "is Server list");
	// GET_TODOSクエリを実行してTODOリストを取得
	const { loading, error, data } = useQuery<{ todos: Todo[] }>(GET_TODOS);

	// UPDATE_TODO_STATUSミューテーションの設定
	const [updateTodoStatus] = useMutation(UPDATE_TODO_STATUS, {
		// キャッシュ更新は自動的に行われることが多い（IDとフィールドが一致するため）
		// 必要であれば optimisticResponse や update 関数でカスタマイズ可能
		onError: (err) => console.error("Error updating todo:", err),
	});

	// DELETE_TODOミューテーションの設定
	const [deleteTodo] = useMutation(DELETE_TODO, {
		// ミューテーション成功後にキャッシュを更新
		update(cache, { data: { deleteTodo } }) {
			if (!deleteTodo || !deleteTodo.success) return;

			// 削除されたTODOのIDを取得 (バックエンドが返す形式に依存)
			// この例では deleteTodo ミューテーション自体がIDを返さない想定
			// そのため、ミューテーション実行時の variables から ID を取得する方が確実な場合がある
			// ここでは例として、update関数に渡される情報からはIDが直接取れないケースを想定し、
			// キャッシュから該当IDのアイテムをフィルタリングで削除する方法を示す

			// キャッシュから現在のTODOリストを読み込む
			const existingTodos = cache.readQuery<{ todos: Todo[] }>({
				query: GET_TODOS,
			});

			if (existingTodos) {
				// 削除されたIDはミューテーション実行時のvariablesから取得するのがより堅牢
				// ここでは update 関数に渡される情報のみを使う例として filter を使う
				// const deletedId = ???; // deleteTodo mutationのvariablesから取得推奨
				// 簡単な例として、IDが直接取得できない場合の代替案 (非効率な場合あり)
				// cache.modify を使って特定IDのアイテムを削除する方がより効率的
				// cache.writeQuery({
				// 	query: GET_TODOS,
				// 	// data: { todos: existingTodos.todos.filter(todo => todo.id !== deletedId) },
				// 	// 注意: 上記は deletedId が必要。より良い方法は cache.modify を使うこと
				// 	// refetchQueries: [{ query: GET_TODOS }] // 簡単な代替案: クエリを再実行
				// });
				// 推奨: cache.modify を使用して効率的に削除
				// cache.modify({
				//   fields: {
				//     todos(existingTodosRefs = [], { readField }) {
				//       return existingTodosRefs.filter(
				//         todoRef => deletedId !== readField('id', todoRef)
				//       );
				//     }
				//   }
				// });
			}
		},
		refetchQueries: [{ query: GET_TODOS }], // 最も簡単なキャッシュ更新方法: クエリを再実行
		onError: (err) => console.error("Error deleting todo:", err),
	});

	// チェックボックスの状態が変わったときのハンドラ
	const handleToggleComplete = (id: string, completed: boolean) => {
		updateTodoStatus({ variables: { id, completed: !completed } });
	};

	// 削除ボタンがクリックされたときのハンドラ
	const handleDelete = (id: string) => {
		if (window.confirm("本当に削除しますか？")) {
			deleteTodo({ variables: { id } });
		}
	};

	if (loading) return <p>読み込み中...</p>;
	if (error) return <p>エラーが発生しました: {error.message}</p>;
	if (!data || !data.todos || data.todos.length === 0)
		return <p>TODOはありません。</p>;

	return (
		<ul>
			{data.todos.map((todo) => (
				<li
					key={todo.id}
					style={{
						textDecoration: todo.completed ? "line-through" : "none",
						marginBottom: "0.5rem",
					}}
				>
					<input
						type="checkbox"
						checked={todo.completed}
						onChange={() => handleToggleComplete(todo.id, todo.completed)}
						style={{ marginRight: "0.5rem" }}
					/>
					{todo.text}
					<span className="ml-4">{todo.owner.name}</span>
					<button
						type="button"
						onClick={() => handleDelete(todo.id)}
						style={{ marginLeft: "0.5rem", color: "red" }}
					>
						削除
					</button>
				</li>
			))}
		</ul>
	);
}
