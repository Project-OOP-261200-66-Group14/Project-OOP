package group14.demo;

import java.util.HashMap;
import java.util.Map;

class Game {
	private int playerBudget;
	private final Map<String, Integer> cityCentersDeposit;
	private final Map<String, Integer> areaOwners;
	private String currentPlayer;
	private final static int MOVE_COST = 1;
	private final static int ATTACK_COST = 10;
	private final static int MAX_TURNS = 100;
	private int currentTurn;

	public Game() {
		this.playerBudget = 10000;
		this.cityCentersDeposit = new HashMap<>();
		this.areaOwners = new HashMap<>();
		this.currentPlayer = "Player1";
		this.currentTurn = 0;

		this.cityCentersDeposit.put("CentralCity", 100);
	}

	public void loadConfiguration(String configFilePath) {
	}

	public int getPlayerBudget() {
		return playerBudget;
	}

	public int getCityCenterDeposit(String cityCenter) {
		return cityCentersDeposit.getOrDefault(cityCenter, 0);
	}

	public double calculateInterest(int deposit, int interestRate) {
		return deposit * interestRate / 100.0;
	}

	public void moveTeam(String direction) {

		if (canMove(direction)) {
			playerBudget -= MOVE_COST;
			updatePlayerPositionAfterMove(direction);
		}
	}

	private boolean canMove(String direction) {

		return true;
	}

	private void updatePlayerPositionAfterMove(String direction) {

	}

	public void investInArea(String area, int investmentAmount) {
		if (playerBudget >= investmentAmount) {
			playerBudget -= investmentAmount;
			cityCentersDeposit.put(area, cityCentersDeposit.getOrDefault(area, 0) + investmentAmount);
		}
	}

	public void collectFromArea(String area, int collectAmount) {
		int currentDeposit = cityCentersDeposit.getOrDefault(area, 0);
		if (currentDeposit >= collectAmount) {
			cityCentersDeposit.put(area, currentDeposit - collectAmount);
			playerBudget += collectAmount;
		}
	}

	public void attackArea(String targetArea, int attackAmount) {
		if (areaOwners.containsKey(targetArea)) {
            areaOwners.get(targetArea);
            if (playerBudget >= attackAmount + ATTACK_COST) {
                int currentDeposit = cityCentersDeposit.getOrDefault(targetArea, 0);
                int newDeposit = Math.max(0, currentDeposit - attackAmount);
                cityCentersDeposit.put(targetArea, newDeposit);

                playerBudget -= (attackAmount + ATTACK_COST);
                if (newDeposit == 0) {
                    areaOwners.remove(targetArea);
                }
            }
        }
	}

	public void endTurn() {
		// สิ้นสุดการเล่นของผู้เล่นปัจจุบันและเปลี่ยนไปยังผู้เล่นต่อไป
		currentTurn++;
		if (currentTurn >= MAX_TURNS) {
			endGame(); // จบเกมหากถึงจำนวนรอบสูงสุดที่กำหนด
		}
		// สมมติว่าเกมมีเพียงผู้เล่น 2 คนที่เล่นสลับกันไปมา
		currentPlayer = currentPlayer.equals("Player1") ? "Player2" : "Player1";
		applyInterestToAllAreas(); // ให้ดอกเบี้ยกับทุกพื้นที่ที่มีการฝากเงิน
	}
	private void applyInterestToAllAreas() {
		for (Map.Entry<String, Integer> entry : cityCentersDeposit.entrySet()) {
			double interest = calculateInterest(entry.getValue(), 5); // สมมติว่าอัตราดอกเบี้ยคือ 5%
			cityCentersDeposit.put(entry.getKey(), (int) (entry.getValue() + interest));
		}
	}
	private void endGame() {
		// ดำเนินการต่างๆ เมื่อเกมจบ
	}
}
