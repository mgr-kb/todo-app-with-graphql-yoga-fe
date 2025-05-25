"use client";

import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TODO, GET_TODOS } from "@/graphql/operations";

export function AddTodoForm() {
	const [text, setText] = useState("");
	const [addTodo, { loading, error }] = useMutation(ADD_TODO, {
		// ミューテーション成功後に実行されるコールバック
		// ここでキャッシュを更新して、新しいTODOをリストに即時反映させる
		update(cache, { data: { addTodo } }) {
			// 既存のTODOリストをキャッシュから読み込む
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const existingTodos = cache.readQuery<{ todos: any[] }>({
				query: GET_TODOS,
			});

			if (existingTodos && addTodo.success && addTodo.todo) {
				// 新しいTODOを既存のリストに追加してキャッシュを更新
				cache.writeQuery({
					query: GET_TODOS,
					data: { todos: [...existingTodos.todos, addTodo.todo] },
				});
			}
		},
		// エラーハンドリング (任意)
		// onError: (err) => { console.error("Error adding todo:", err); }
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!text.trim()) return; // 空の入力は無視

		addTodo({ variables: { text } });
		setText(""); // 送信後に入力フィールドをクリア
	};

	return (
		<form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
			<input
				type="text"
				placeholder="新しいTODOを入力"
				value={text}
				onChange={(e) => setText(e.target.value)}
				disabled={loading} // 処理中は無効化
				style={{ marginRight: "0.5rem" }}
			/>
			<button type="submit" disabled={loading}>
				{loading ? "追加中..." : "追加"}
			</button>
			{error && (
				<p style={{ color: "red" }}>エラーが発生しました: {error.message}</p>
			)}
		</form>
	);
}
