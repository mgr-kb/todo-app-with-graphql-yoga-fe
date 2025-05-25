import { AddTodoForm } from "@/components/AddTodoForm";
import { TodoList } from "@/components/TodoList";

export default function Home() {
	const isClient = typeof window !== "undefined";
	console.log(isClient ? "is Client" : "is Server");
	return (
		<div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
			<main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<h1>TODO アプリ</h1>
				<AddTodoForm />
				<TodoList />
			</main>
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
				お試し
			</footer>
		</div>
	);
}
