import {FormEvent} from "react";

export default function Home() {

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        console.log(e.target);
    }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between m-auto">
        <div>

            <form action="/api">
                <h1 className="text-7xl font-semibold text-secondary-dark">Cypress</h1>
                <input type="text" id="email" />
                <input type="text" id="password" />

                <button type="submit">Submit</button>
            </form>

        </div>

    </main>
  )
}
