declare global {
	namespace NodeJS {
		interface ProcessEnv {
			OPEN_AI_KEY: string
			OPEN_AI_MODEL: string
		}
	}
}