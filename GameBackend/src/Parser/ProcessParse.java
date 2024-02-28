package Parser;

import Tokenizer.*;
import Statement.*;
import java.util.ArrayList;
import java.util.List;

public class ProcessParse implements Parser {
    private final Tokenizer tkz;

    public ProcessParse(Tokenizer tkz) {
        this.tkz = tkz;
    }

    @Override
    public Expr parse() throws SyntaxError, LexicalError {
        Expr result = parsePlan();
        if (tkz.hasNextToken()) {
            throw new SyntaxError("leftover token");
        }
        return result;
    }

    // Plan → Statement+
    private Expr parsePlan() {
        List<Expr> statements = new ArrayList<>();

        while (tkz.hasNextToken()) {
            Expr expression = parseExpression();
            statements.add(expression);

            if (tkz.peek().equals(";")) {
                tkz.consume(";");
            } else {
                break;
            }
        }
        return new Plan(statements);
    }

    // Statement → Command | BlockStatement | IfStatement | WhileStatement
    private Expr parseStatement() {
        String currentToken = tkz.peek();

        if ("if".equals(currentToken)) {
            return parseIfStatement();
        } else if ("while".equals(currentToken)) {
            return parseWhileStatement();
        } else if ("{".equals(currentToken)) {
            return parseBlockStatement();
        } else if ("...".equals(currentToken)) {
            return parseCommand();
        }
        throw new SyntaxError("Invalid statement: " + currentToken);
    }

    // Command → AssignmentStatement | ActionCommand
    private Expr parseCommand() {
        String currentToken = tkz.peek();

        if ("assignment".equals(currentToken)) {
            return new Command(parseAssignmentStatement());
        } else {
            return new Command(parseActionCommand());
        }
    }

    // AssignmentStatement → Expression
    private Expr parseAssignmentStatement() {
        String variable = tkz.consume();
        tkz.consume("=");
        Expr expression = parseExpression();
        return new AssignmentStatement(variable, expression);
    }

    // ActionCommand → done | relocate | MoveCommand | RegionCommand | AttackCommand
    private Expr parseActionCommand() {
        String currentToken = tkz.peek();
        return switch (currentToken) {
            case "done" -> {
                tkz.consume("done");
                yield new ActionCommand(ActionType.DONE);
            }
            case "relocate" -> {
                tkz.consume("relocate");
                yield new ActionCommand(ActionType.RELOCATE);
            }
            case "move" -> parseMoveCommand();
            case "region" -> parseRegionCommand();
            case "attack" -> parseAttackCommand();
            default -> throw new SyntaxError("Invalid action command: " + currentToken);
        };
    }

    // MoveCommand → move Direction
    private Expr parseMoveCommand() {
        tkz.consume("move");
        Expr direction = parseDirection();
        return new MoveCommand(direction);
    }

    // RegionCommand → invest Expression | collect Expression
    private Expr parseRegionCommand() {
        String currentToken = tkz.peek();

        if ("invest".equals(currentToken)) {
            tkz.consume("invest");
            Expr expression = parseExpression(); // You need to implement parseExpression
            return new InvestCommand(expression);
        } else if ("collect".equals(currentToken)) {
            tkz.consume("collect");
            Expr expression = parseExpression(); // You need to implement parseExpression
            return new CollectCommand(expression);
        } else {
            throw new SyntaxError("Invalid region command: " + currentToken);
        }
    }

    // AttackCommand → shoot Direction Expression
    private Expr parseAttackCommand() {
        tkz.consume("shoot");
        Expr direction = parseDirection();
        Expr expression = parseExpression();
        return new AttackCommand(direction, expression);
    }

    // Direction → up | down | upleft | upright | downleft | downright
    private Expr parseDirection() throws SyntaxError {
        if (tkz.hasNextToken()) {
            boolean currentToken = tkz.hasNextToken();
            String direction = String.valueOf(currentToken);
            if ("up".equals(direction) || "down".equals(direction)
                    || "upleft".equals(direction) || "upright".equals(direction)
                    || "downleft".equals(direction) || "downright".equals(direction)) {
                return new Direction(direction);
            }
        }
        throw new SyntaxError("Expected direction keyword, but found the end of input");
    }


    // BlockStatement → { Statement* }
    private Expr parseBlockStatement() {
        tkz.consume("{");
        List<Expr> statements = new ArrayList<>();
        while (!tkz.peek().equals("}")) {
            statements.add(parseStatement());
        }
        tkz.consume("}");
        return new BlockStatement(statements);
    }

    // IfStatement → if ( Expression ) then Statement else Statement
    private Expr parseIfStatement() {
        tkz.consume("if");
        tkz.consume("(");
        Expr condition = parseExpression();
        tkz.consume(")");
        Expr thenClause = parseStatement();
        tkz.consume("else");
        Expr elseClause = parseStatement();
        return new IfStatement(condition, thenClause, elseClause);
    }

    // WhileStatement → while ( Expression ) Statement
    private Expr parseWhileStatement() {
        tkz.consume("while");
        tkz.consume("(");
        Expr condition = parseExpression();
        tkz.consume(")");
        Expr thenClause = parseStatement();
        return new WhileStatement(condition, thenClause);
    }

    // Expression → Expression + Term | Expression - Term | Term
    private Expr parseExpression() {
        Expr e = parseTerm();
        while (tkz.peek("+") || tkz.peek("-")) {
            String operator = tkz.consume();
            e = new BinaryArithExpr(e, operator, parseTerm());
        }
        return e;
    }

    // Term → Term * Factor | Term / Factor | Term % Factor | Factor
    private Expr parseTerm() {
        Expr t = parseFactor();
        while (tkz.peek("*") || tkz.peek("/") || tkz.peek("%")) {
            String operator = tkz.consume();
            t = new BinaryArithExpr(t, operator, parseExpression());
        }
        return t;
    }

    private Expr parseFactor() {
        Expr t = parsePower(); // Change this line to parsePower
        while (tkz.peek("^")) {
            String operator = tkz.consume();
            t = new BinaryArithExpr(t, operator, parsePower());
        }
        return t;
    }

    // Power → <number> | <identifier> | ( Expression ) | InfoExpression
    private Expr parsePower() {
        if (tkz.hasNextToken()) {
            String currentToken = tkz.peek();
            if (isNumber(currentToken)) {
                return parseExpression();
            } else if (isVariable(currentToken)) {
                return parseAssignmentStatement();
            } else if ("(".equals(currentToken)) {
                tkz.consume("(");
                Expr expression = parseExpression();
                tkz.consume(")");
                return expression;
            } else if (isInfoExpression(currentToken)) {
                return parseIntoExpression();
            } else {
                throw new SyntaxError("Invalid token: " + currentToken);
            }
        } else {
            throw new SyntaxError("Unexpected end of input");
        }
    }

    // InfoExpression → opponent | nearby Direction
    private Expr parseIntoExpression() {
        String currentToken = tkz.peek();

        if ("opponent".equals(currentToken)) {
            tkz.consume("opponent");
            return new OpponentExpr();
        } else if ("nearby".equals(currentToken)) {
            tkz.consume("nearby");
            Expr direction = parseDirection();
            return new NearbyExpr(direction);
        } else {
            // Handle the case where none of the expected tokens match
            throw new SyntaxError("Invalid InfoExpression: " + currentToken);
        }
    }

    private boolean isNumber(String peek) {
        try {
            Integer.parseInt(peek);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    private boolean isVariable(String peek) {
        return peek.matches("[a-zA-Z_][a-zA-Z0-9_]*");
    }

    private boolean isInfoExpression(String peek) {
        return (peek.equals("opponent") || peek.equals("nearby Direction"));
    }
}
