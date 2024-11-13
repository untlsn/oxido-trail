declare global {
	namespace NodeJS {
		interface ProcessEnv {
			OPEN_AI_KEY: string
		}
	}
}