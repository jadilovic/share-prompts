import Link from 'next/link';

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
	return (
		<section>
			<h1>
				<span>{type} Post</span>
			</h1>
			<p>
				{type} and share any ideas about AI generated solutions for your
				prompts.
			</p>
			<form className={`${type.toLowerCase()}-form`} onSubmit={handleSubmit}>
				<label htmlFor="prompt">
					<span>Your AI Prompt</span>
				</label>
				<textarea
					value={post.prompt}
					onChange={(e) => setPost({ ...post, prompt: e.target.value })}
					required
					placeholder="Write your prompt here..."
					name="prompt"
					id="prompt"
					cols="30"
					rows="10"
				></textarea>
				<label htmlFor="tag">
					<span>Add Tag</span>
				</label>
				<input
					value={post.tag}
					onChange={(e) => setPost({ ...post, tag: e.target.value })}
					required
					placeholder="Write your tag..."
					name="tag"
					id="tag"
				></input>
				<div className="submit-cancel">
					<Link href="/">Cancel</Link>
					<button type="submit" disabled={submitting}>
						{submitting ? `${type}...` : type}
					</button>
				</div>
			</form>
		</section>
	);
};
export default Form;
