package GameProcess;

import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class ConfigGameTest {

    @Test
    void testReaderFile() {
        assertDoesNotThrow(() -> GameConfig.loadConfigFromFile(".\\src\\GameProcess\\ConfigFile"));
        assertThrows(RuntimeException.class, () -> GameConfig.loadConfigFromFile("psod.txt"));
    }

    @Test
    void testGetAll() {
        GameConfig.loadConfigFromFile(".\\src\\GameProcess\\ConfigFile");
        assertEquals(20, GameConfig.getM());
        assertEquals(15, GameConfig.getN());
        assertEquals(5, GameConfig.getInit_plan_min());
        assertEquals(0, GameConfig.init_plan_sec());
        assertEquals(10000, GameConfig.init_budget());
        assertEquals(100, GameConfig.init_center_dep());
        assertEquals(30, GameConfig.plan_rev_min());
        assertEquals(0, GameConfig.plan_rev_sec());
        assertEquals(100, GameConfig.rev_cost());
        assertEquals(1000000, GameConfig.max_dep());
        assertEquals(5, GameConfig.interest_pct());
    }
}