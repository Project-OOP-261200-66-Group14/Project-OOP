import GameProcess.GameConfig;

public class Main {
    public static void main(String[] args) {
        try {
            GameConfig gameConfig = new GameConfig();
            gameConfig.loadConfigFromFile(".\\src\\GameProcess\\ConfigFile");
        } catch (RuntimeException e) {
            System.err.println("Error: Configuration file not found.");
        }
    }
}