import styles from "../styles/InstructionsComponent.module.css";
import { Button } from "@/components/ui/button";

export default function InstructionsComponent() {
	return (
		<div className={`${styles.container} bg-gradient-to-r from-purple-500 to-blue-500 p-8 rounded-lg shadow-lg`}>
			<header className={`${styles.header_container} text-center mb-10`}>
				<h1 className="text-[48px] font-extrabold text-white mb-4">
					Welcome to <span className="text-yellow-300">Zkads</span>
				</h1>
				<h3 className="text-[28px] text-white italic">The Future of Decentralized Advertising</h3>
			</header>
			<main className={`${styles.main_content} text-white`}>
				<section className="mb-12">
					<h2 className="text-[32px] font-semibold mb-4">Advertisers</h2>
					<p className="text-[20px] mb-6">
						Post your advertisement data on-chain with target ad group criteria and funds to pay for ad views.
					</p>
					<Button className="bg-yellow-300 hover:bg-yellow-400 text-black px-6 py-3 rounded-full shadow-md transition duration-300">Get Started</Button>
				</section>
				<section>
					<h2 className="text-[32px] font-semibold mb-4">Users</h2>
					<p className="text-[20px] mb-6">
						Collect data on your device, commit to a hash of this data on-chain, and watch for targeted advertisements. Generate a proof that you fit the target group criteria, view the ad, and release funds to yourself.
					</p>
					<Button className="bg-green-400 hover:bg-green-500 text-black px-6 py-3 rounded-full shadow-md transition duration-300">Learn More</Button>
				</section>
			</main>
		</div>
	);
}
