package Parser;
import Tokenizer.*;

public class ProcessParse implements Parser {
    private final Tokenizer tkz;

    public ProcessParse(Tokenizer tkz) {
        this.tkz = tkz;
    }

    // Plan → Statement+
    private void parsePlan() {

    }

    // Statement → Command | BlockStatement | IfStatement | WhileStatement
    private void parseStatement() {

    }

    // Command → AssignmentStatement | ActionCommand
    private void parseCommand() {

    }

    // AssignmentStatement → Expression
    private void parseAssignmentStatement() {

    }

    // ActionCommand → done | relocate | MoveCommand | RegionCommand | AttackCommand
    private void parseActionCommand() {

    }

    // MoveCommand → move Direction
    private void parseMoveCommand() {

    }

    // RegionCommand → invest Expression | collect Expression
    private void parseRegionCommand() {

    }

    // AttackCommand → shoot Direction Expression
    private void parseAttackCommand() {

    }

    // Direction → up | down | upleft | upright | downleft | downright
    private void parseDirection() {

    }

    // BlockStatement → { Statement* }
    private void parseBlockStatement() {

    }

    // IfStatement → if ( Expression ) then Statement else Statement
    private void parseIfStatement() {

    }

    // WhileStatement → while ( Expression ) Statement
    private void parseWhileStatement() {

    }

    // Expression → Expression + Term | Expression - Term | Term
    private void parseExpression() {

    }

    // Term → Term * Factor | Term / Factor | Term % Factor | Factor
    private void parseTerm() {

    }

    // Factor → Power ^ Factor | Power
    private void parseFactor() {

    }

    // Power → <number> | <identifier> | ( Expression ) | InfoExpression
    private void parsePower() {

    }

    // InfoExpression → opponent | nearby Direction
    private void parseIntoExpression() {

    }

}
