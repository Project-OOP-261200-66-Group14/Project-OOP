package GameProcess;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;

public class GameConfig extends GameController{
    private static int m;
    private static int n;
    private static int init_plan_min;
    private static int init_plan_sec;
    private static int init_budget;
    private static int init_center_dep;
    private static int plan_rev_min;
    private static int plan_rev_sec;
    private static int rev_cost;
    private static int max_dep;
    private static int interest_pct;

    public static void loadConfigFromFile(String fileConfig) {
        try (BufferedReader reader = new BufferedReader(new FileReader(fileConfig))) {
            String line;
            while ((line = reader.readLine()) != null) {
                processConfigLine(line);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error reading configuration file", e);
        }
    }

    private static void processConfigLine(String line) {
        String[] tokens = line.split("=");

        if (tokens.length == 2) {
            String key = tokens[0].trim();
            String value = tokens[1].trim();

            switch (key) {
                case "m":
                    m = Integer.parseInt(value);
                    break;
                case "n":
                    n = Integer.parseInt(value);
                    break;
                case "init_plan_min":
                    init_plan_min = Integer.parseInt(value);
                    break;
                case "init_plan_sec":
                    init_plan_sec = Integer.parseInt(value);
                    break;
                case "init_budget":
                    init_budget = Integer.parseInt(value);
                    break;
                case "init_center_dep":
                    init_center_dep = Integer.parseInt(value);
                    break;
                case "plan_rev_min":
                    plan_rev_min = Integer.parseInt(value);
                    break;
                case "plan_rev_sec":
                    plan_rev_sec = Integer.parseInt(value);
                    break;
                case "rev_cost":
                    rev_cost = Integer.parseInt(value);
                    break;
                case "max_dep":
                    max_dep = Integer.parseInt(value);
                    break;
                case "interest_pct":
                    interest_pct = Integer.parseInt(value);
                    break;
                default:
                    break;
            }
        }
    }

    static int getM() {
        return m;
    }

    static int getN() {
        return n;
    }

    static int getInit_plan_min() {
        return init_plan_min;
    }

    static int init_plan_sec() {
        return init_plan_sec;
    }

    static int init_budget() {
        return init_budget;
    }

    static int init_center_dep() {
        return init_center_dep;
    }

    static int plan_rev_min() {
        return plan_rev_min;
    }

    static int plan_rev_sec() {
        return plan_rev_sec;
    }

    static int rev_cost() {
        return rev_cost;
    }

    static int max_dep() {
        return max_dep;
    }

    static int interest_pct() {
        return interest_pct;
    }
}